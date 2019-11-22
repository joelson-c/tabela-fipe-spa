import { createContext, useContext } from 'react';

import RootStore from './RootStore'

export const StoreContext = createContext({ ...RootStore })

export const useStores = () => useContext(StoreContext)

export default StoreContext
