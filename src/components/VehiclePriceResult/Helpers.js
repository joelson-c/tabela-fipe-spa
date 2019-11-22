import { useStores } from '../../store/StoreContext'

export const usePriceFetcher = () => {
  const { uiStore, resourceStore } = useStores()

  return () => {
    const { selectedBrand, selectedModel, selectedModelYear } = uiStore
    const { fetchVehiclePrice } = resourceStore

    fetchVehiclePrice({ selectedBrand, selectedModel, selectedModelYear })
  }
}