import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'
import { components } from 'react-select'

export const itemHeight = 44

const MenuItemOption = styled.div`
  overflow: visible;
  white-space: nowrap;
  min-width: 100%;

  /* prevent from react-window trying to reset the width */
  width: auto !important;
`

const calculateListHeight = (maxListHeight, listLength) => {
  const maxItems = Math.round(maxListHeight / itemHeight)

  if (listLength >= maxItems) {
    return maxListHeight
  } else {
    return listLength * itemHeight
  }
}

export default props => {
  const { maxHeight, children } = props
  const listRef = useRef()

  const sccrollToFocused = () => {
    if (listRef.current) {
      const oldFocusedIndex = children.findIndex(option => option.props.isFocused)
      listRef.current.scrollToItem(oldFocusedIndex)
    }
  }

  useEffect(() => {
    sccrollToFocused()
    window.addEventListener('keydown', sccrollToFocused)

    return () => window.removeEventListener('keydown', sccrollToFocused)
  })


  if (children.length !== undefined) {
    const height = calculateListHeight(maxHeight, children.length)

    return (
      <List
        height={height}
        itemCount={children.length}
        itemSize={itemHeight}
        ref={listRef}
      >
        {({ index, style }) => <MenuItemOption style={style}>{children[index]}</MenuItemOption>}
      </List>
    )
  } else {
    return <components.MenuList {...props} />
  }
}
