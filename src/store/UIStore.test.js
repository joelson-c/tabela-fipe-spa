import UIStore from './UIStore'
import { testAutorun } from '../testUtils'

describe('UIStore', () => {
  let store

  beforeEach(() => {
    const formDefs = [
      {
        id: 1,
        test: true
      },
      {
        id: 2
      }
    ]

    const initialState = {
      formStepIdx: 0
    }

    store = new UIStore(formDefs, initialState)
  })

  test('deve ir para uma etapa determinada', () => {
    const newStepId = 2
    const newStepIdx = 1

    store.goToStep(newStepId)

    expect(store.formStepIdx).toBe(newStepIdx)
  })

  test('deve retornar uma exceção quando receber um ID invalido', () => {
    const invalidFormStepId = Number.MAX_VALUE
    const errorMsg = 'Invalid form step id'

    expect(() => {
      store.goToStep(invalidFormStepId)
    }).toThrow(new Error(errorMsg))
  })

  test('deve ir para a proxima etapa', () => {
    const newStepIdx = 1

    store.goToNextStep()

    expect(store.formStepIdx).toBe(newStepIdx)
  })

  test('deve ir para a etapa anterior', () => {
    const newStepId = 1
    const oldStepIdx = 0

    store.goToStep(newStepId)
    store.goToPreviousStep()

    expect(store.formStepIdx).toBe(oldStepIdx)
  })

  test('deve retornar informacoes da etapa atual', () => {
    const formStepInfo = store.formStepInfo

    expect(formStepInfo).toEqual({ id: 1, test: true })
  })

  test('deve mostrar se o formulario esta preenchido', () => {
    const newStepId = 2

    store.goToStep(newStepId)
    store.goToNextStep()

    const isFormFilled = store.isFormFilled

    expect(isFormFilled).toBe(true)
  })
})