import React from 'react'
import styled from 'styled-components'

import { Container, GridItem } from '../Base/Grid'

import spinnerSvg from './spinner.svg'

const LoadingContainer = styled.div`
  visibility: hidden;
  text-align: center;

  animation: loading 0.2s linear 0.3s forwards;

  @keyframes loading {
    to {
      visibility: visible;
    }
  }
`

const IndicatorText = styled.p`
  display: inline-block;

  font-size: 1.3em;
  font-weight: 300;
`;

const IndicatorIcon = styled.object`
  width: 70px;
  height: 70px;

  vertical-align: middle;
  margin: 0 15px;

  pointer-events: none;
`

const LoadingIndicator = ({ actionText }) => (
  <Container alignItems="center">
    <GridItem>
      <LoadingContainer>
        <IndicatorIcon data={spinnerSvg} aria-labelledby="actionText" />
        <IndicatorText id="actionText">{actionText}</IndicatorText>
      </LoadingContainer>
    </GridItem>
  </Container>
);

export default LoadingIndicator
