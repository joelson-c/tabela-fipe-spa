import styled from 'styled-components'

import { Container } from './Grid'

const Button = styled.button`
  display: inline-block;
  appearance: none;

  font-family: inherit;
  font-size: inherit;
  text-decoration: none;

  border: 0;
  border-radius: 2px;

  background-color: ${props => props.secondary ? '#E0E0E0' : '#009688'};
  color: ${props => props.secondary ? '#000' : '#fff'};
  box-shadow: 0 2px 4px ${props => props.secondary ? '#9E9E9E' : '#009688'};

  padding: 13px;
  margin: ${props => props.isBlock ? '4px 0' : '4px'};
  width: ${props => props.isBlock ? '100%' : 'auto'};

  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.secondary ? '#BDBDBD' : '#00796B'};
    transition: background-color 0.3s;
  }

  &:disabled {
    background-color: #E0E0E0;
    color: rgba(0,0,0,0.65);
    box-shadow: none;
  }

  &:focus {
    outline: 2px solid black;
  }
`
export const ButtonContainer = styled(Container)`
  flex-direction: row-reverse;
  padding: 1em 0 0 0;
`

export const RightSideButtonContainer = styled.div`
  @media screen and (min-width: 640px) {
    margin-left: auto;
  }
`

export default Button
