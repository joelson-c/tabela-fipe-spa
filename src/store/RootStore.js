import { configure } from 'mobx'

import TransportLayer from '../api/TransportLayer'
import UIStore from './UIStore'
import Definitions from '../AppDefinitions'
import ResourceStore from './ResourceStore'

configure({ enforceActions: 'always' })

const uiStore = new UIStore(Definitions.formSteps)
const resourceStore = new ResourceStore(new TransportLayer())

export default { uiStore, resourceStore }
