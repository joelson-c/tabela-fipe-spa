import React from 'react'
import styled from 'styled-components'
import Select, { createFilter } from 'react-select'

import MenuList from './MenuList'

const ControlLabel = styled.label`
    line-height: 2.5rem;
`

const componentStyle = {
  control: (provided, state) => ({
    ...provided,

    borderColor: state.isFocused ? '#000' : '#26A69A',
    borderWidth: '2px',
    boxShadow: null,
    padding: '5px',
    marginBottom: '5px',
    lineHeight: '25px',

    '&:hover': {
      borderColor: '#00897B',
      transition: 'border-color 0.5s'
    }
  }),

  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    color: isSelected && '#fff',
    backgroundColor: isSelected ? '#00897B' : (isFocused ? '#80CBC4' : '#fff'),
    padding: '12px',
    overflow: 'visible',
    '&:hover': {
      color: '#fff',
      backgroundColor: isSelected ? '#00796B' : '#009688'
    },
  })
}

const SelectInput = ({ labelText, onOptionSelected, isLoading, ...selectProps }) => {
  return (
    <>
      <ControlLabel>{labelText}</ControlLabel>

      <Select
        {...selectProps}
        noOptionsMessage={() => "Não há opções disponíveis"}
        styles={componentStyle}
        components={{ MenuList }}
        filterOption={createFilter({ ignoreAccents: true, ignoreCase: true })} />
    </>
  )
}

export default SelectInput
