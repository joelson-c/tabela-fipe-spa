import { action, observable, decorate, intercept } from 'mobx'
import { fromPromise, computedFn, isPromiseBasedObservable, PENDING, FULFILLED } from 'mobx-utils'

import Definitions from "../AppDefinitions"

const _defaultInitialState = {
  currentResourceList: null,
  vehiclePriceResource: null
}

class ResourceStore {
  constructor(transportLayer, initialState) {
    this.setInitialState(initialState || _defaultInitialState)

    this.transportLayer = transportLayer
    this.resourceCache = []

    intercept(this, "currentResourceList", (change) => {
      const newResourceList = change.newValue
      const currentResourceList = this.currentResourceList

      if (isPromiseBasedObservable(currentResourceList) && isPromiseBasedObservable(newResourceList)) {
        if (newResourceList.state === PENDING) {
          this.resourceCache.push(currentResourceList.value)
        }
      } else if (!isPromiseBasedObservable(currentResourceList) && isPromiseBasedObservable(newResourceList)) {
        if (newResourceList.state === FULFILLED) {
          this.resourceCache.push(newResourceList)
        }
      }

      return change
    })
  }

  setInitialState = initialState => {
    const { currentResourceList, vehiclePriceResource } = initialState

    this.currentResourceList = currentResourceList
    this.vehiclePriceResource = vehiclePriceResource
  }

  fetchVehicleResourceList = (formStepId, { selectedBrand, selectedModel } = {}) => {
    switch (formStepId) {
      case Definitions.formStepIds.VEHICLE_BRAND:
        this.currentResourceList = fromPromise(this.transportLayer.fetchBrands())
        break
      case Definitions.formStepIds.VEHICLE_MODEL:
        this.currentResourceList = fromPromise(
          this.transportLayer.fetchVehicleModels(selectedBrand.value)
        )
        break
      case Definitions.formStepIds.VEHICLE_MODEL_YEAR:
        this.currentResourceList = fromPromise(
          this.transportLayer.fetchVehicleModelYears(selectedBrand.value, selectedModel.value)
        )
        break
      default:
        throw new Error('Invalid form step id')
    }
  }

  getVehiclePrice = computedFn(({ selectedBrand, selectedModel, selectedModelYear }) => {
    return fromPromise(
      this.transportLayer.fetchVehiclePrice(
        selectedBrand.value,
        selectedModel.value,
        selectedModelYear.value
      )
    )
  })

  fetchVehiclePrice = ({ selectedBrand, selectedModel, selectedModelYear }) => {
    this.vehiclePriceResource = fromPromise(
      this.transportLayer.fetchVehiclePrice(
        selectedBrand.value,
        selectedModel.value,
        selectedModelYear.value
      )
    )
  }

  getLastResourceList = () => {
    const lastResourceListValue = this.resourceCache.pop()

    this.currentResourceList = null
    this.currentResourceList = fromPromise(resolve => resolve(lastResourceListValue))
  }

  clearResourceCache = () => {
    this.resourceCache = []
  }
}

decorate(ResourceStore, {
  currentResourceList: observable,
  vehiclePriceResource: observable,

  setInitialState: action,
  fetchVehicleResourceList: action,
  fetchVehiclePrice: action,
  getLastResourceList: action
})

export default ResourceStore
