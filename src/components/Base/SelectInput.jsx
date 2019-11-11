import React from 'react'
import styled from 'styled-components'
import Select, { createFilter, components } from 'react-select'
import { FixedSizeList as List } from 'react-window'

const ITEM_HEIGHT = 44

const ControlLabel = styled.label`
    line-height: 2.5rem;
`

const MenuItemOption = styled.div`
  overflow: visible;
  white-space: nowrap;
  min-width: 100%;

  /* prevent from react-window trying to reset the width */
  width: auto !important;
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

  option: (provided, { isSelected }) => ({
    ...provided,
    color: isSelected && '#fff',
    backgroundColor: isSelected ? '#00897B' : '#fff',
    padding: '12px',
    overflow: 'visible',
    '&:hover': {
      color: '#fff',
      backgroundColor: isSelected ? '#00796B' : '#009688'
    },
  })
}

const MenuList = props => {
  const { options, getValue, hasValue, maxHeight, children } = props
  const maxItems = Math.round(maxHeight / ITEM_HEIGHT)
  let height = 0
  let initialOffset = 0

  if (children.length !== undefined) {
    if (children.length >= maxItems) {
      height = maxHeight
    } else {
      height = children.length * ITEM_HEIGHT
    }

    if (hasValue) {
      const [value] = getValue()

      initialOffset = options.findIndex(option => option.value === value.value) * ITEM_HEIGHT
    }

    return (
      <List
        height={height}
        itemCount={children.length}
        itemSize={ITEM_HEIGHT}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <MenuItemOption style={style}>{children[index]}</MenuItemOption>}
      </List>
    )
  } else {
    return <components.MenuList {...props} />
  }
}

const SelectInput = ({ labelText, onOptionSelected, isLoading, ...selectProps }) => {
  return (
    <>
      <ControlLabel>{labelText}</ControlLabel>

      <Select
        {...selectProps}
        noOptionsMessage={() => "Não há opções disponíveis"}
        pageSize={0}
        styles={componentStyle}
        components={{ MenuList }}
        filterOption={createFilter({ ignoreAccents: true, ignoreCase: true })} />
    </>
  )
}

export default SelectInput
