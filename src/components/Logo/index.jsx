import React from 'react'
import styled, { css } from 'styled-components'

import logoSvg from './logo.svg'

const LogoObject = styled.object`
  ${props => props.centered && css`
    display: block;
    margin: 0 auto;
  `}

  width: ${props => props.width};
  max-height: 30px;
  max-width: ${props => props.width};

  pointer-events: none;
  vertical-align: baseline;
`

export default (props) => (
  <LogoObject
    data={logoSvg}
    aria-label="mobiauto"
    type="image/svg+xml"
    tabIndex="-1"
    {...props}>
      mobiauto
  </LogoObject>
)
