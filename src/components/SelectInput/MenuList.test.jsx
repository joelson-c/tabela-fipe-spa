import React from 'react'
import { mount } from 'enzyme'
import MenuList, { itemHeight } from './MenuList'

const generateTestList = (listSize) => {
  return [...Array(listSize)].map((_, idx) => {
    return <div key={idx}>Option #{idx}</div>
  })
}

describe('SelectInput - MenuList', () => {
  test('deve calcular o tamanho correto da lista', () => {
    const listSize = 2
    const childrenList = generateTestList(listSize)
    const maxListHeight = 300
    const component = mount(
      <MenuList maxHeight={maxListHeight}>{childrenList}</MenuList>
    )

    expect(component.prop('children')).toEqual(childrenList)
    expect(component.children().prop('height')).toBe(childrenList.length * itemHeight)
  })

  test('deve manter a altura maxima da lista caso a quantidade de items exceda o especificado', () => {
    const listSize = 30
    const childrenList = generateTestList(listSize)
    const maxListHeight = 300
    const component = mount(
      <MenuList maxHeight={maxListHeight}>{childrenList}</MenuList>
    )

    expect(component.prop('children')).toEqual(childrenList)
    expect(component.children().prop('height')).toBe(maxListHeight)
  })
})