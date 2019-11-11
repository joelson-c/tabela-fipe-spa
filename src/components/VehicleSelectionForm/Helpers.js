export const toSelectableList = (listToConvert) => {
  return listToConvert.map(({ nome: label, codigo: value }) => ({ value, label }))
}

export const formatVehicleModel = (fullVehicleNameStr) => {
  const splitedVehicleName = fullVehicleNameStr.split(" ")
  return [splitedVehicleName[0], splitedVehicleName.slice(1).join(" ")]
}
