import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { isPromiseBasedObservable } from 'mobx-utils'

import { formatVehicleModel } from '../VehicleSelectionForm/Helpers'
import { StoreContext } from '../../store/StoreContext'

import Button, { ButtonContainer, RightSideButtonContainer } from '../Base/Button'
import HeaderText from '../Base/HeaderText'
import VehiclePriceSkeleton from './VehiclePriceSkeleton'

const PriceValue = styled.p`
  font-weight: 300;
  font-size: 1.75em;
  margin: 0.5em 0;
`

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
  padding: 15px;
`

class VehiclePriceResult extends PureComponent {
  static contextType = StoreContext

  componentDidMount() {
    const { selectedBrand, selectedModel, selectedModelYear } = this.context.uiStore
    const { fetchVehiclePrice } = this.context.resourceStore

    fetchVehiclePrice({ selectedBrand, selectedModel, selectedModelYear })
  }

  onNewSearchBtnClick = () => {
    const { resetUI } = this.context.uiStore

    resetUI()
  }

  render() {
    const { selectedModel } = this.context.uiStore
    const { vehiclePriceResource } = this.context.resourceStore

    const [vehicleName, vehicleDescription] = formatVehicleModel(selectedModel.label)

    return (
      <Card>
        <HeaderText>{vehicleName}<small>{vehicleDescription}</small></HeaderText>

        <VehiclePriceSkeleton>
          {isPromiseBasedObservable(vehiclePriceResource) && vehiclePriceResource.case({
            fulfilled: (vehiclePriceValue) => (
              <>
                <PriceValue>{vehiclePriceValue.price}</PriceValue>
                <p>Mês de referência: {vehiclePriceValue.referenceMonth}</p>
                <p>Ano modelo: {vehiclePriceValue.modelYear}</p>
                <p>Codigo Fipe: {vehiclePriceValue.fipeCode}</p>
              </>
            ),
            rejected: (error) => {
              throw new Error(error)
            }
          })}
        </VehiclePriceSkeleton>

        <ButtonContainer>
          <RightSideButtonContainer>
            <Button as="a" href="https://www.mobiauto.com.br" target="_blank" rel="noopener" tabIndex="2">
              Ver anuncios na Mobiauto
            </Button>
          </RightSideButtonContainer>

          <Button onClick={this.onNewSearchBtnClick} tabIndex="1" secondary>Nova Pesquisa</Button>
        </ButtonContainer>
      </Card>
    )
  }
}

export default observer(VehiclePriceResult)
