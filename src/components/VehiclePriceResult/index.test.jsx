import React from 'react'
import { mount } from 'enzyme'

import StoreContext from '../../store/StoreContext'

import VehiclePriceResult from '.'

import { TestVehicleModels, TestVehiclePrice } from '../../testUtils/FakeTransportLayer'
import TestStore from '../../testUtils/TestStore'
import { fromPromise } from 'mobx-utils'

const mountComponent = () => {
  return mount(
    <StoreContext.Provider value={{ ...TestStore }}>
      <VehiclePriceResult />
    </StoreContext.Provider>
  )
}

describe('VehiclePriceResult', () => {
  beforeEach(() => {
    TestStore.uiStore.selectedModel = {
      label: TestVehicleModels[0].nome,
      value: TestVehicleModels[0].codigo
    }

    TestStore.resourceStore.fetchVehiclePrice = () => null

    TestStore.resourceStore.vehiclePriceResource = fromPromise.resolve(TestVehiclePrice)
  })

  test('deve exibir corretamente as informacoes de preco do veículo', () => {
    const component = mountComponent()
    const componentText = component.text()

    expect(componentText).toMatch(TestVehiclePrice.price)
    expect(componentText).toMatch(TestVehiclePrice.fipeCode)
    expect(componentText).toMatch(TestVehiclePrice.referenceMonth)
  })
})