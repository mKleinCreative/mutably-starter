import React, { Component } from 'react'
import Button from './button'
export default class Pokemon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      newValues: {
        name: '',
        pokedex: '',
        image: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps = this.props)
    const currentState = this.state
    currentState.newValues = { 
      name: this.props.name,
      pokedex: this.props.pokedex,
      image: this.props.image 
    }
    this.setState(currentState)
  }
  handleEditPokemon = () => {
    this.setState({ editing: true })
  }

  handleSavePokemon = () => {
    fetch(`https://mutably.herokuapp.com/pokemon/${this.props._id}`, {
      method: 'PUT',
      mode: 'cors', 
      body: JSON.stringify(this.state.newValues), 
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    .then(response => response.json())
    .then(pokemons => console.log('updated pokemon::', pokemons))
    this.setState({ editing: false })
}
  

  renderSaveOrEdit = () => {
    const editing = this.state.editing

    if (editing) {
      return <Button buttonType={this.handleSavePokemon} text={ "save" } />
    } else {
      return <Button buttonType={this.handleEditPokemon} text={ "edit" } />
    }
  }

  handleChange = ( key, value) => {
    const currentState = this.state
    currentState.newValues[key] = value
  
    this.setState({
      currentState
    })
  }

  renderInput = () => {
    const { editing } = this.state
    const { name, image, pokedex } = this.props

    if (editing) {
      return (
        <div>
          <input onChange={ e => this.handleChange('name', e.target.value ) } value={ this.state.newValues.name } type='text' />
          <input onChange={ e => this.handleChange('pokedex', e.target.value ) } value={ this.state.newValues.pokedex } type= 'text' />
          <input onChange={ e => this.handleChange('image', e.target.value ) } value={ this.state.newValues.image } type='text' />
        </div>
      )
    } else {
      return (
        <div>
          <div> { name } </div>
          <div> { pokedex } </div>
          <img src={ image } />
        </div>
      )
    }
  }

  toggleEdit = () => {
    this.state.editing === false ? 
      this.setState({editing: true}) :
      this.setState({editing: false})
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.item}>
          { this.renderSaveOrEdit() }
          { this.renderInput() }
          <Button buttonType={() => console.log( '<3333333 cake <3333333' ) } text={"delete"} />
        </div>
      </div>
    );
  }
}


const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },

  item: {
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 15
  }
};