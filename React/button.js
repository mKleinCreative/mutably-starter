import React, { Component } from 'react'

export default class Button extends Component {
  constructor(props) {
    super(props)
  }
  
  
  
  render() {
    const { text, buttonType } = this.props

    return (
      <button onClick={ buttonType }> { text } </button>
    )
  }
}