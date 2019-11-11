import React from 'react'
import styled from 'styled-components'

import { Container, GridItem } from './Base/Grid'

const FooterNotes = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
`

export default () => (
  <Container>
    <GridItem>
      <FooterNotes>
        A Tabela Fipe expressa preços médios de veículos no mercado nacional,
        servindo apenas como um parâmetro para negociações ou avaliações.
        Os preços efetivamente praticados variam em função da região, conservação, cor,
        acessórios ou qualquer outro fator que possa influenciar as condições de oferta e
        procura por um veículo específico.
      </FooterNotes>
    </GridItem>
  </Container>
)
