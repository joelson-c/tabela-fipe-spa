import React, { useContext, Suspense } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { Container, GridItem } from '../Base/Grid'
import HeaderText from '../Base/HeaderText'
import ErrorHandler from '../ErrorHandler'
import StoreContext from '../../store/StoreContext'
import LoadingIndicator from '../LoadingIndicator'

const VehiclePriceResult = React.lazy(() => import('../VehiclePriceResult'))
const VehicleSelectionForm = React.lazy(() => import('.'))

const FormHostGridItem = styled(GridItem)`
  padding: 0 1.2em;

  @media screen and (min-width: 1270px) {
    padding: 3em;
  }
`

const FormHost = () => {
  const { uiStore: { isFormFilled } } = useContext(StoreContext)

  return (
    <Container>
      <GridItem>
        <HeaderText centered>Tabela FIPE</HeaderText>
      </GridItem>
      <FormHostGridItem>
        <ErrorHandler>
          <Suspense fallback={<LoadingIndicator />}>
            {isFormFilled ? <VehiclePriceResult /> : <VehicleSelectionForm />}
          </Suspense>
        </ErrorHandler>
      </FormHostGridItem>
    </Container>
  )
}

export default observer(FormHost)
