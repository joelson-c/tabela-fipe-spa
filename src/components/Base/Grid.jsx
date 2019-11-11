import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
  flex-wrap: wrap;
  align-items: ${props => props.alignItems || null};
`

export const GridItem = styled.div`
  flex: 1 1 auto;

  padding: 1rem;
`
