console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  getAllPokemons()
  
  $('.create-pokemon-form').on('submit', function(event) {
    event.preventDefault()
    var newPokemon = $(this).serialize()
    console.log( '---===newPokemon===---', newPokemon ); 
    $(this).trigger("reset")
    $.ajax({
      method: 'POST',
      url: 'https://mutably.herokuapp.com/pokemon/',
      data: newPokemon,
      success: handleAddPokemonResponse
    })
  })
  
  $(document).on('click', '.delete-btn', function() {
    var id = $(this).data('id')
    $.ajax({
      method: 'DELETE',
      url: 'http://mutably.herokuapp.com/pokemon/'+id,
      success: handlePokemonDeleteResponse
    })
  })
  
  $(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id')
    console.log( '---===id===---', id ); 

    $('.name-'+id).hide()
    $('.input-'+id).show()
    
    $('.edit-'+id).hide()
    $('.save-'+id).show()
  })
  
  $(document).on('click', '.save-btn', function() {
    var id = $(this).data('id')
    console.log( '---===id===---', id ); 
    var updatedName = $('.input-'+id+' input').val()
    console.log( '---===updatedName===---', updatedName ); 
    $.ajax({
      method: 'PUT',
      url: 'http://mutably.herokuapp.com/pokemon/'+id,
      data: {name: updatedName},
      success: handlePokemonUpdateResponse
    })
  })
});
// code in here

function getAllPokemons() {
  $('.list-group').html('')
  $.ajax({
    method: 'GET',
    url: 'https://mutably.herokuapp.com/pokemon'
  }).done( ( data ) => {
    console.log( '---===data===---', data ); 
    for (var i = 0; i < data.pokemon.length; i++) {
      $('.list-group').append('<li class="list-group-item item-'+data.pokemon[i]._id+'">'
      +'<button class="btn btn-primary edit-btn edit-'+data.pokemon[i]._id+'" data-id="'+data.pokemon[i]._id+'">Edit</button>'
      +'<button class="btn btn-success save-btn save-'+data.pokemon[i]._id+'" data-id="'+data.pokemon[i]._id+'">Save</button>'
      +'<span class="name-'+data.pokemon[i]._id+'">&nbsp;'+data.pokemon[i].name+'</span>'
      +'<span class="pokedex-'+data.pokemon[i]._id+'">&nbsp;'+data.pokemon[i].pokedex+'</span>'
      +'<img class="image-'+data.pokemon[i]._id+'" src="'+data.pokemon[i].image+'"></img>'
      +'<span class="form-inline edit-form input-'+data.pokemon[i]._id+'">&nbsp;<input class="form-control" value="'+data.pokemon[i].name+'"/></span>'
      +'<button class="btn btn-danger delete-btn pull-right" data-id="'+data.pokemon[i]._id+'">Delete</button>'
      +'</li>')
    }
  })
}

function handleAddPokemonResponse(data) {
  console.log( '---===Pokemon Added===---', data );
  getAllPokemons()
};

function handlePokemonDeleteResponse(data) {
  console.log( '---===handlePokemonDeleteResponse got ===---', data ); 
  var pokemonId = data._id
  var $row = $('.item-' + pokemonId)
  
  $row.remove()
}

function handlePokemonUpdateResponse(data) {
  var id = data._id
  console.log( '---===data===---', data ); 
  console.log( '---===id===---', id ); 
  $('.name-'+id).html('&nbsp;'+data.name)
  
  $('.name-'+id).show()
  $('.input-'+id).hide()
  $('.edit-'+id).show()
  $('.save-'+id).hide()
}
