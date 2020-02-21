import { action, observable, decorate, computed } from 'mobx'
import { computedFn } from 'mobx-utils'

import Definitions from "../AppDefinitions"

const _defaultInitialState = {
  selectedBrand: null,
  selectedModel: null,
  selectedModelYear: null,
  formStepIdx: 0
}

class UIStore {
  constructor(formStepDefs, initialState) {
    this.setInitialState(initialState || _defaultInitialState)

    this.formStepDefs = formStepDefs
  }

  setInitialState(initialState) {
    const { selectedBrand, selectedModel, selectedModelYear, formStepIdx } = initialState

    this.selectedBrand = selectedBrand
    this.selectedModel = selectedModel
    this.selectedModelYear = selectedModelYear
    this.formStepIdx = formStepIdx
  }

  setRequestState = requestState => {
    this.requestState = requestState
  }

  goToNextStep = () => {
    if (this.formStepIdx < this.formStepDefs.length) {
      this.formStepIdx++
    }
  }

  goToPreviousStep = () => {
    if (this.formStepIdx > 0) {
      this.formStepIdx--
    }
  }

  goToStep = formStepId => {
    const newFormStepIdx = Object.keys(this.formStepDefs)
      .findIndex(objKey => this.formStepDefs[objKey].id === formStepId)

    if (newFormStepIdx >= 0) {
      this.formStepIdx = newFormStepIdx
    } else {
      throw new Error('Invalid form step id')
    }
  }

  resetUI = () => {
    this.setInitialState(_defaultInitialState)
  }

  updateResourceInput = (formStepId, resource) => {
    switch (formStepId) {
      case Definitions.formStepIds.VEHICLE_BRAND:
        this.selectedBrand = resource
        break
      case Definitions.formStepIds.VEHICLE_MODEL:
        this.selectedModel = resource
        break
      case Definitions.formStepIds.VEHICLE_MODEL_YEAR:
        this.selectedModelYear = resource
        break
      default:
        throw new Error('Invalid form step id')
    }
  }

  getSelectedValue = computedFn((formStepId) => {
    switch (formStepId) {
      case Definitions.formStepIds.VEHICLE_BRAND:
        return this.selectedBrand
      case Definitions.formStepIds.VEHICLE_MODEL:
        return this.selectedModel
      case Definitions.formStepIds.VEHICLE_MODEL_YEAR:
        return this.selectedModelYear
      default:
        throw new Error('Invalid form step id')
    }
  })

  get formStepInfo() {
    const formStepIdx = this.formStepIdx

    return this.formStepDefs[formStepIdx]
  }

  get isFormFilled() {
    const formStepIdx = this.formStepIdx
    return formStepIdx === this.formStepDefs.length
  }

  get isFinalStep() {
    const formStepIdx = this.formStepIdx
    return formStepIdx === this.formStepDefs.length - 1
  }
}

decorate(UIStore, {
  formStepIdx: observable,
  selectedBrand: observable,
  selectedModel: observable,
  selectedModelYear: observable,

  setInitialState: action,
  setRequestState: action,

  goToNextStep: action,
  goToPreviousStep: action,
  goToStep: action,
  resetUI: action,
  updateResourceInput: action,

  formStepInfo: computed,
  isFormFilled: computed
})

export default UIStore
