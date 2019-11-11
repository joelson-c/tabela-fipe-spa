export const TestBrands = [
  { "nome": "VW - VolksWagen", "codigo": "59" },
  { "nome": "Acura", "codigo": "1" },
  { "nome": "Agrale", "codigo": "2" },
  { "nome": "Agrale", "codigo": "3" },
  { "nome": "Agrale", "codigo": "4" },
  { "nome": "Agrale", "codigo": "5" },
  { "nome": "Agrale", "codigo": "6" },
  { "nome": "Agrale", "codigo": "7" },
  { "nome": "Agrale", "codigo": "8" },
  { "nome": "Agrale", "codigo": "9" },
  { "nome": "Agrale", "codigo": "10" },
  { "nome": "Agrale", "codigo": "11" },
  { "nome": "Agrale", "codigo": "12" },
  { "nome": "Agrale", "codigo": "13" },
  { "nome": "Agrale", "codigo": "14" }
]

export const TestVehicleModels = [
  { "nome": "AMAROK High.CD 2.0 16V TDI 4x4 Dies. Aut", "codigo": '5940' },
  { "nome": "AMAROK CD2.0 16V /S CD2.0 16V TDI 4x2 Die", "codigo": '5585' },
  { "nome": "AMAROK CD2.0 16V /S CD2.0 16V TDI 4x4 Die", "codigo": '5586' }
]

export const TestVehicleModelYears = [
  { "nome": "2014 Diesel", "codigo": "2014-3" },
  { "nome": "2013 Diesel", "codigo": "2013-3" },
  { "nome": "2012 Diesel", "codigo": "2012-3" }
]

export const TestVehiclePrice = {
  price: "R$ 91.949,00",
  fipeCode: "005340-6",
  referenceMonth: "novembro de 2019",
  modelYear: 2014,
  vehicleFuel: "Diesel"
}

class FakeTransportLayer {
  fetchBrands() {
    return Promise.resolve(TestBrands)
  }

  fetchVehicleModels(brandCode) {
    return Promise.resolve(TestVehicleModels)
  }

  fetchVehicleModelYears(brandCode, vehicleCode) {
    return Promise.resolve(TestVehicleModelYears)
  }

  fetchVehiclePrice(brandCode, vehicleCode, vehicleModelYearCode) {
    return Promise.resolve(TestVehiclePrice)
  }
}

export default FakeTransportLayer
