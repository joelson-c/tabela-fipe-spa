import { when } from "mobx"
import { FULFILLED } from "mobx-utils"

import ResourceStore from "./ResourceStore"
import { testAutorun } from '../testUtils'
import FakeTransportLayer, {
  TestBrands, TestVehicleModels, TestVehicleModelYears
} from '../testUtils/FakeTransportLayer'

import Definitions from "../AppDefinitions"
describe('ResourceStore', () => {
  let store

  beforeEach(() => {
    store = new ResourceStore(new FakeTransportLayer())
  })

  test.each([
    ['marcas', Definitions.formStepIds.VEHICLE_BRAND, TestBrands],
    ['modelos', Definitions.formStepIds.VEHICLE_MODEL, TestVehicleModels],
    ['anos modelos', Definitions.formStepIds.VEHICLE_MODEL_YEAR, TestVehicleModelYears]
  ])
    ('deve retornar uma lista de %s', async (_, formStepId, expected) => {
      testAutorun(() => {
        store.fetchVehicleResourceList(
          formStepId,
          { selectedBrand: TestBrands[0], selectedModel: TestVehicleModels[0] }
        )
      })

      const result = store.currentResourceList

      await when(() => result.state === FULFILLED)

      expect(result.value).toEqual(expected)

    })

  test('deve retornar uma exceção quando receber um ID invalido', () => {
    const invalidFormStepId = Number.MAX_VALUE
    const errorMsg = 'Invalid form step id'

    testAutorun(() => {
      expect(() => {
        store.fetchVehicleResourceList(invalidFormStepId)
      }).toThrow(new Error(errorMsg))
    })
  })

  test('deve armanezar todas as listas de recursos em cache', async () => {
    store.fetchVehicleResourceList(Definitions.formStepIds.VEHICLE_BRAND)

    await when(() => store.currentResourceList.state === FULFILLED)

    store.fetchVehicleResourceList(
      Definitions.formStepIds.VEHICLE_MODEL,
      { selectedBrand: TestBrands[0] }
    )

    await when(() => store.currentResourceList.state === FULFILLED)

    expect(store.resourceCache).toMatchObject([TestBrands])

    store.fetchVehicleResourceList(
      Definitions.formStepIds.VEHICLE_MODEL_YEAR,
      { selectedBrand: TestBrands[0], selectedModel: TestVehicleModels[0] }
    )

    await when(() => store.currentResourceList.state === FULFILLED)

    expect(store.resourceCache).toMatchObject([TestBrands, TestVehicleModels])
  })

  test('deve apresentar recursos armazenados em cache', async () => {
    store.fetchVehicleResourceList(Definitions.formStepIds.VEHICLE_BRAND)

    await when(() => store.currentResourceList.state === FULFILLED)

    store.fetchVehicleResourceList(
      Definitions.formStepIds.VEHICLE_MODEL,
      { selectedBrand: TestBrands[0] }
    )

    store.getLastResourceList()

    await when(() => store.currentResourceList.state === FULFILLED)

    expect(store.currentResourceList.value).toBe(TestBrands)
  })
})
