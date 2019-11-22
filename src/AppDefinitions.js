export default class Definitions {
  static formStepIds = {
    VEHICLE_BRAND: 1,
    VEHICLE_MODEL: 2,
    VEHICLE_MODEL_YEAR: 3
  }

  static formSteps = [
    {
      id: this.formStepIds.VEHICLE_BRAND,
      inputLabel: 'Marca',
      inputPlaceholderText: 'Digite ou selecione uma marca',
      actionText: 'Obtendo lista de marcas...'
    },
    {
      id: this.formStepIds.VEHICLE_MODEL,
      inputLabel: 'Modelo',
      inputPlaceholderText: 'Digite ou selecione um modelo',
      actionText: 'Obtendo lista de modelos...',
      hasPreviousBtn: true
    },
    {
      id: this.formStepIds.VEHICLE_MODEL_YEAR,
      inputLabel: 'Ano modelo',
      inputPlaceholderText: 'Digite ou selecione um ano modelo',
      actionText: 'Buscando informações do veículo...',
      nextBtnText: 'Pesquisar',
      hasSearchBtn: true,
      hasPreviousBtn: true,
      hasRestartBtn: true
    }
  ]

  static requestStatesIds = {
    REQUEST_DONE: 1,
    REQUEST_FAILED: 2,
    REQUEST_PENDING: 3
  }
}
