import React, { Component } from 'react'
import Fetch from 'react-fetch'
import Title from './Title'
import Pokemon from './Pokemon'
import Button from './Button'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: []
    }
    this.onRemovePokemon = this.onRemovePokemon.bind(this)
  }

  componentDidMount() {
    this.getAllPokemon()
  }

  getAllPokemon = () => {
    fetch(`https://mutably.herokuapp.com/pokemon`)
      .then( response => {
        return response.json()
      })
      .then( pokemons => {
        console.log('pokemons::', pokemons)
        this.setState( {
          pokemons: pokemons.pokemon,
          add: {
            name: "",
            pokedex: "",
            image: ""
          }
        })
      })
  }

  handleAddPokemon = () => {
    fetch(`https://mutably.herokuapp.com/pokemon`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(this.state.add),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then( () => this.getAllPokemon())
  }

  onAddPokemonChange = ( key, value) => {
    const currentState = this.state
    currentState.add[key] = value

    this.setState({
      state: currentState
    })
  }

  onRemovePokemon = (id) => {
    const { pokemons } = this.state
    console.log( '---===pokemons._id===---', id );
    console.log( '---===pokemons===---', pokemons ); 
    this.getAllPokemon()
  }

  

  render() {
    const { names, images, pokedex } = this.state
    const allPokemonsJSX = (this.state.pokemons || []).map( pokemon =>
      <Pokemon 
        key={pokemon._id}
        onRemovePokemon={ this.onRemovePokemon.bind(this) }
        {...pokemon} 
      />
    )
    const addPokemonInput = () => {
      return (
        <div>
          <input onChange={ e => this.onAddPokemonChange('name', e.target.value ) } value={ names } type='text' placeholder="name of pokemon"/>
          <input onChange={ e => this.onAddPokemonChange('pokedex', e.target.value ) } value={ pokedex } type= 'text' placeholder="pokedex number"/>
          <input onChange={ e => this.onAddPokemonChange('image', e.target.value ) } value={ images } type='text' placeholder="image URL"/>
          <Button buttonType={ this.handleAddPokemon } text={ 'Add Pokemon' }/>
        </div>
      )
    }
    return (
      <div style={styles.container}>
        <Title>
          PERK A MERN
        </Title>
        { addPokemonInput() }
        { allPokemonsJSX }
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
}