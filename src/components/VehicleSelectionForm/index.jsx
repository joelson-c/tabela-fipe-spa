import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { isPromiseBasedObservable } from 'mobx-utils'

import { useStores } from '../../store/StoreContext'
import { toSelectableList, useResourceFetcher } from './Helpers'

import SelectInput from '../SelectInput'
import LoadingIndicator from '../LoadingIndicator'
import FormActions from './FormActions'

const VehicleSelectionForm = () => {
  const { resourceStore, uiStore } = useStores()
  const fetchResourceList = useResourceFetcher()

  useEffect(() => {
    fetchResourceList()
  }, []) // eslint-disable-line

  const onSelectChange = (selectedOption) => {
    const { formStepInfo, updateResourceInput } = uiStore

    updateResourceInput(formStepInfo.id, selectedOption)
  }

  const onNextBtnClick = () => {
    const { goToNextStep, isFinalStep } = uiStore

    goToNextStep()

    if (!isFinalStep) {
      fetchResourceList()
    }
  }

  const onPreviousBtnClick = () => {
    const { formStepInfo, goToPreviousStep, updateResourceInput } = uiStore
    const { getLastResourceList } = resourceStore

    updateResourceInput(formStepInfo.id, null)

    goToPreviousStep()

    getLastResourceList()
  }

  const onRestartBtnClick = () => {
    const { formStepInfo, updateResourceInput } = uiStore
    const { clearResourceCache } = resourceStore

    updateResourceInput(formStepInfo.id, null)
    clearResourceCache()

    uiStore.resetUI()

    fetchResourceList()
  }

  const { currentResourceList } = resourceStore
  const { formStepInfo, getSelectedValue } = uiStore

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
            onChange={onSelectChange}
            options={toSelectableList(currentResourceListValue)}
            tabIndex="1"
          />

          <FormActions
            nextBtnText={formStepInfo.nextBtnText}
            isNextBtnDisabled={!selectedValue}
            hasPreviousBtn={formStepInfo.hasPreviousBtn}
            hasRestartBtn={formStepInfo.hasRestartBtn}
            onNextBtnClick={onNextBtnClick}
            onPreviousBtnClick={onPreviousBtnClick}
            onRestartBtnClick={onRestartBtnClick}
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

export default observer(VehicleSelectionForm)
