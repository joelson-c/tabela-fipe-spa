import UIStore from './UIStore'

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
    const [newStepId, newStepIdx] = [2, 1]
    const oldStepIdx = 0

    store.goToStep(newStepId)

    expect(store.formStepIdx).toBe(newStepIdx)

    store.goToPreviousStep()

    expect(store.formStepIdx).toBe(oldStepIdx)
  })

  test('deve retornar informacoes da etapa atual', () => {
    const formStepInfo = store.formStepInfo

    expect(formStepInfo).toEqual({ id: 1, test: true })
  })

  test('isFormFilled deve retornar verdadeiro caso o formulario esteja preenchido', () => {
    const newStepId = 2
    const expResult = true

    store.goToStep(newStepId)
    store.goToNextStep()

    expect(store.isFormFilled).toBe(expResult)
  })

  test('isFormFilled deve retornar falso caso o formulario não esteja preenchido', () => {
    const newStepId = 2
    const expResult = false

    store.goToStep(newStepId)

    expect(store.isFormFilled).toBe(expResult)
  })

  test('isFinalStep deve retornar verdadeiro caso o formulario esteja na etapa final', () => {
    const newStepId = 2
    const expResult = true

    store.goToStep(newStepId)

    expect(store.isFinalStep).toBe(expResult)
  })

  test('isFinalStep deve retornar falso caso o formulario não esteja na etapa final', () => {
    const expResult = false

    expect(store.isFinalStep).toBe(expResult)
  })
})