import React, { Component } from 'react'
import Fetch from 'react-fetch'
import Title from './Title'
import Pokemon from './Pokemon'

// VinylList = React.createClass({
//   getInitialState() {
//     return {
//       editing: null
//     };
//   },
//   toggleEditing( itemId ) {
//     this.setState( { editing: itemId } );
//   },
//   renderItemOrEditField( item ) {
//     if ( this.state.editing === item._id ) {
//       // Handle rendering our edit fields here.
//     } else {
//       return <li
//         onClick={ this.toggleEditing.bind( null, item._id ) }
//         key={ item._id }
//         className="list-group-item">
//         { `${ item.title } by ${ item.artist } (${ item.releaseYear })` }
//       </li>;
//     }
//   },
//   render() {
//     return <ul className="list-group">
//       {this.props.items.map( ( item ) => {
//         return this.renderItemOrEditField( item );
//       })}
//     </ul>;
//   }
// });

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: []
    }
    // this.updatePokemon = this.updatePokemon.bind(this)
  }
  
  componentDidMount() {
    this.getAllPokemon()
  }
  
  //[{name: '1', image: '...', pokedex: 1}, {name: '2', image: '...', pokedex: 1}]
  
  getAllPokemon = () => {
    fetch(`https://mutably.herokuapp.com/pokemon`)
      .then( response => {
        return response.json()
      })
      .then( pokemons => {
        console.log('pokemons::', pokemons)
        this.setState( {
          pokemons: pokemons.pokemon
        })
      })
  }
  
  // updatePokemon = (i) => {
  //   this.setState({
  //     newValues: {
  //       name: 
  //       pokedex: 
  //       image:
  //     }
  //   })
  // }

  // onAddPokemon = (newPokemon) => {
  //   const { pokemons } = this.state
  // 
  //   this.setState({
  //     pokemon: [...newPokemon, ...pokemon],
  //   })
  // }

  // onRemovePokemon = (index) => {
  //   const { pokemons } = this.state
  //   this.setState({
  //     pokemon: pokemon.filter((name, i) => i !== index),
  //   })
  // }

  render() {
    const { names, images, pokedex } = this.state
    const allPokemonsJSX = (this.state.pokemons || []).map( pokemon =>
        <Pokemon {...pokemon} />
    )
    return (
      <div style={styles.container}>
        <Title>
          PERK A MERN
        </Title>
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