import React, { Component } from 'react'

export default class Pokemon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputType: [
        "save", 
        "edit", 
        "delete"
      ],
      editing: false
    }
  }
  
  // renderItem = ( names, pokedexs, i ) => {
  //   const { onClickItem } = this.props;
  //   return (
  //     <div style={styles.item} onClick={() => onClickItem(i)}>
  //       { names ? names.map( (name, i) => <div key={i}>Name: {name} </div> ) : null }
  //       { pokedexs ? pokedexs.map( (pokedexs, i) => <div key={i}> Pokedex: {pokedexs} </div>) : null }
  //     </div>
  //   );
  // };

  render() {
    const { name, image, pokedex } = this.props
    // const { save, edit, delete } = this.state.inputType
    return (
      
      <div style={styles.container}>
        <div style={styles.item}>
          <div> {name} </div>
          <div> {pokedex} </div>
          <img src={image} />
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