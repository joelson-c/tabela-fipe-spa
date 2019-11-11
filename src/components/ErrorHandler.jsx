import React, { Component } from 'react'

import { StoreContext } from '../store/StoreContext'
import HeaderText from './Base/HeaderText'

class ErrorHandler extends Component {
  static contextType = StoreContext

  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <HeaderText>Ooops...</HeaderText>
          <p>Não foi possivel concluir a solicitação, tente novamente em alguns minutos.</p>
        </>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorHandler
