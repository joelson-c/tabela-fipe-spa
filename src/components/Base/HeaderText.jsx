import styled from 'styled-components'

export default styled.h1`
  font-weight: 300;
  font-size: 2.5em;
  text-align: ${props => props.centered && 'center'};
  margin: 0.1em 0;

  small {
    display: block;
    color: rgba(0,0,0,0.45);
    font-size: 70%;
  }
`