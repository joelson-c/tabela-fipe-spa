import React, { PureComponent } from 'react'
import { observer } from 'mobx-react'
import { isPromiseBasedObservable } from 'mobx-utils'

import { StoreContext } from '../../store/StoreContext'
import { toSelectableList } from './Helpers'

import SelectInput from '../Base/SelectInput'
import LoadingIndicator from '../LoadingIndicator'
import FormActions from './FormActions'

class VehicleSelectionForm extends PureComponent {
  static contextType = StoreContext

  componentDidMount() {
    this.fetchResourceList()
  }

  onSelectChange = (selectedOption) => {
    const { formStepInfo, updateResourceInput } = this.context.uiStore

    updateResourceInput(formStepInfo.id, selectedOption)
  }

  onNextBtnClick = () => {
    const { goToNextStep, isFinalStep } = this.context.uiStore

    goToNextStep()

    if (!isFinalStep) {
      this.fetchResourceList()
    }
  }

  onPreviousBtnClick = () => {
    const { formStepInfo, goToPreviousStep, updateResourceInput } = this.context.uiStore
    const { getLastResourceList } = this.context.resourceStore

    updateResourceInput(formStepInfo.id, null)

    goToPreviousStep()

    getLastResourceList()
  }

  onRestartBtnClick = () => {
    const { formStepInfo, updateResourceInput } = this.context.uiStore
    const { clearResourceCache } = this.context.resourceStore

    updateResourceInput(formStepInfo.id, null)
    clearResourceCache()

    this.context.uiStore.resetUI()

    this.fetchResourceList()
  }

  fetchResourceList() {
    const { fetchVehicleResourceList } = this.context.resourceStore
    const { formStepInfo, selectedBrand, selectedModel } = this.context.uiStore

    fetchVehicleResourceList(formStepInfo.id, { selectedBrand, selectedModel })
  }

  render() {
    const { currentResourceList } = this.context.resourceStore
    const { formStepInfo, getSelectedValue } = this.context.uiStore

    const selectedValue = getSelectedValue(formStepInfo.id)

    if (isPromiseBasedObservable(currentResourceList)) {
      return currentResourceList.case({
        pending: () => (
          <LoadingIndicator actionText={formStepInfo.actionText} />
        ),
        fulfilled: (currentResourceListValue) => (
          <>
            <SelectInput
              labelText={formStepInfo.inputLabel}
              placeholder={formStepInfo.inputPlaceholderText}
              value={selectedValue}
              onChange={this.onSelectChange}
              options={toSelectableList(currentResourceListValue)}
              tabIndex="1"
            />

            <FormActions
              nextBtnText={formStepInfo.nextBtnText}
              isNextBtnDisabled={!selectedValue}
              hasPreviousBtn={formStepInfo.hasPreviousBtn}
              hasRestartBtn={formStepInfo.hasRestartBtn}
              onNextBtnClick={this.onNextBtnClick}
              onPreviousBtnClick={this.onPreviousBtnClick}
              onRestartBtnClick={this.onRestartBtnClick}
            />
          </>
        ),
        rejected: (error) => {
          throw new Error(error)
        }
      })
    } else {
      return null
    }
  }
}

export default observer(VehicleSelectionForm)
