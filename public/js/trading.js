'use strict';

$(document).ready(init);

function init() {
  console.log('jQuery works');
  loadDashboard();
  $('.saveNewItem').click(saveNewItemClicked);
}

function saveNewItemClicked() {
  var item = {
    name: $('.newItemName').val(),
    description: $('.newItemDescription').val(),
    owner: localStorage.getItem('_id')
  };

  if(item.name.length === 0 || item.description === 0) {
    $('.addItemFeedback').text('Please add a name and a description.');
  } else {
    $.post('/dashboard', item)
    .done(function(data) {
      $('.footerFeedback').text('Item saved.').fadeOut(5000);
      $('.newItemName').val('');
      $('.newItemDescription').val('');
      var $tr = $('<tr>').addClass('userItemTr');
      var $tdAvailable = $('<td>').addClass('itemAvailable');
      var $checkbox = $('<input>').attr({type: 'checkbox', name: 'available', value: 'available'});
      $tdAvailable.append($checkbox);
      var $tdName = $('<td>').addClass('itemName').text(data.name);
      var $tdDescription = $('<td>').addClass('itemDescription').text(data.description);
      var $tdId = $('<td>').addClass('itemId').text(data._id);
      var $tdDelete = $('<td>').addClass('itemDelete');
      $tdDelete.append('<button>').text('Delete Item').addClass('btn btn-danger btn-xs-12 deleteItem');
      $tr.append($tdAvailable, $tdName, $tdDescription, $tdId, $tdDelete);
      $('.userItemsTbody').append($tr).show();

    })
    .fail(function(err){
      console.error(err);
    });

  }

    
  

}

function loadDashboard() {
  $.get('/dashboard/' + localStorage._id)
  .done(function(items) {
    items.forEach(function(item) {
      var $tr = $('<tr>').addClass('userItemTr');
      var $tdAvailable = $('<td>').addClass('itemAvailable');
      var $checkbox = $('<input>').attr({type: 'checkbox', name: 'available', value: 'available'});
      $tdAvailable.append($checkbox);
      var $tdName = $('<td>').addClass('itemName').text(item.name);
      var $tdDescription = $('<td>').addClass('itemDescription').text(item.description);
      var $tdId = $('<td>').addClass('itemId').text(item._id);
      var $tdDelete = $('<td>').addClass('itemDelete');
      $tdDelete.append('<button>').text('Delete Item').addClass('btn btn-danger btn-xs-12 deleteItem');
      $tr.append($tdAvailable, $tdName, $tdDescription, $tdId, $tdDelete);
      $('.userItemsTbody').append($tr).show();

    });
    
  })
  .fail(function(err) {
    console.error(err);
  });
}