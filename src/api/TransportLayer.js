const BASE_API_URL = 'https://parallelum.com.br/fipe/api/v1'

class TransportLayer {
  constructor(baseApiUrl = BASE_API_URL) {
    this.baseApiUrl = baseApiUrl
  }

  async fetchBrands() {
    try {
      const response = await fetch(`${this.baseApiUrl}/carros/marcas`)

      if (response.ok) {
        const responseJson = await response.json()

        return responseJson
      } else {
        const error = new Error(response.statusText)
        error.response = response

        throw error
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async fetchVehicleModels(brandCode) {
    try {
      const response = await fetch(`${this.baseApiUrl}/carros/marcas/${brandCode}/modelos`)

      if (response.ok) {
        const responseJson = await response.json()

        return responseJson.modelos
      } else {
        const error = new Error(response.statusText)
        error.response = response

        throw error
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async fetchVehicleModelYears(brandCode, vehicleCode) {
    try {
      const response = await fetch(`${this.baseApiUrl}/carros/marcas/${brandCode}/modelos/${vehicleCode}/anos`)

      if (response.ok) {
        const responseJson = await response.json()

        return responseJson
      } else {
        const error = new Error(response.statusText)
        error.response = response

        throw error
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async fetchVehiclePrice(brandCode, vehicleCode, vehicleModelYearCode) {
    try {
      const response = await fetch(
        `${this.baseApiUrl}/carros/marcas/${brandCode}/modelos/${vehicleCode}/anos/${vehicleModelYearCode}`
      )

      if (response.ok) {
        const responseJson = await response.json()

        return this.mapVehiclePrice(responseJson)
      } else {
        const error = new Error(response.statusText)
        error.response = response

        throw error
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  mapVehiclePrice(vehiclePriceObj) {
    return {
      price: vehiclePriceObj.Valor,
      fipeCode: vehiclePriceObj.CodigoFipe,
      referenceMonth: vehiclePriceObj.MesReferencia,
      modelYear: vehiclePriceObj.AnoModelo,
      vehicleFuel: vehiclePriceObj.Combustivel
    }
  }
}

export default TransportLayer
