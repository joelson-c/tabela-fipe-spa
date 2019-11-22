import React from 'react'
import { mount } from 'enzyme'

import FormWizard from '.'
import Button from '../Base/Button'
import LoadingIndicator from '../LoadingIndicator'

import StoreContext from '../../store/StoreContext'

import { TestBrands } from '../../testUtils/FakeTransportLayer'
import TestStore from '../../testUtils/TestStore'
import { fromPromise } from 'mobx-utils'

const mountComponent = () => {
  return mount(
    <StoreContext.Provider value={{ ...TestStore }}>
      <FormWizard />
    </StoreContext.Provider>
  )
}

const testFormDefs = {
  id: 'test',
  inputLabel: 'Marca',
  inputPlaceholderText: 'Digite ou selecione uma marca',
  actionText: 'Obtendo lista de marcas...',
  hasSearchBtn: true,
  hasPreviousBtn: true,
  hasRestartBtn: true
}

describe('VehicleSelectionForm', () => {
  beforeEach(() => {
    TestStore.uiStore.formStepInfo = testFormDefs

    TestStore.uiStore.getSelectedValue = () => null
    TestStore.uiStore.goToNextStep = () => null
    TestStore.uiStore.goToPreviousStep = () => null
    TestStore.uiStore.updateResourceInput = () => null
    TestStore.uiStore.resetUI = () => null

    TestStore.resourceStore.currentResourceList = fromPromise.resolve(TestBrands)
    TestStore.resourceStore.fetchVehicleResourceList = jest.fn()
    TestStore.resourceStore.getLastResourceList = jest.fn()
    TestStore.resourceStore.clearResourceCache = jest.fn()
  })

  test('deve exibir indicador de acao enquanto nao ha dados para exibir', () => {
    TestStore.resourceStore.currentResourceList = fromPromise(new Promise(resolve => 'test'))

    const component = mountComponent()

    const loadingIndicator = component.find(LoadingIndicator)

    expect(loadingIndicator.exists()).toBe(true)
  })

  test('deve exibir corretamente as propriedades da definicao do formulario', () => {
    const component = mountComponent()
    const componentText = component.text()

    const buttonList = component.find(Button)

    expect(componentText).toMatch(testFormDefs.inputLabel)
    expect(componentText).toMatch(testFormDefs.inputPlaceholderText)
    expect(buttonList).toHaveLength(3)

    buttonList.forEach(btn => {
      expect(btn.children().text()).toMatch(/(Próximo)|(Anterior)|(Reiniciar)/)
    })
  })

  test('deve carregar o recurso correspondente ao ir para a proxima etapa', () => {
    const component = mountComponent()
    const resourceListMock = TestStore.resourceStore.fetchVehicleResourceList

    const buttonList = component.find(Button)

    buttonList.find('button[children="Próximo"]').prop('onClick')()

    expect(resourceListMock).toHaveBeenCalled()
  })

  test('deve carregar o recurso anterior ao ir para a etapa anterior', () => {
    const component = mountComponent()
    const resourceListMock = TestStore.resourceStore.getLastResourceList

    const buttonList = component.find(Button)

    buttonList.find('button[children="Anterior"]').prop('onClick')()

    expect(resourceListMock).toHaveBeenCalled()
  })

  test('deve limpar o cache de recursos ao reiniciar o formulario', () => {
    const component = mountComponent()
    const resourceListMock = TestStore.resourceStore.clearResourceCache

    const buttonList = component.find(Button)

    buttonList.find('button[children="Reiniciar"]').prop('onClick')()

    expect(resourceListMock).toHaveBeenCalled()
  })
})