import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { Container, GridItem } from '../Base/Grid'
import Logo from '../Logo'
import HeaderText from '../Base/HeaderText'
import VehicleSelectionForm from '.'
import ErrorHandler from '../ErrorHandler'
import VehiclePriceResult from '../VehiclePriceResult'
import StoreContext from '../../store/StoreContext'

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
        <Logo width="250px" centered />
      </GridItem>
      <FormHostGridItem>
        <ErrorHandler>
          {isFormFilled ? <VehiclePriceResult /> : <VehicleSelectionForm />}
        </ErrorHandler>
      </FormHostGridItem>
    </Container>
  )
}

export default observer(FormHost)
