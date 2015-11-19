'use strict';

$(document).ready(init);

function init() {
  console.log('jQuery works');
  // loadDashboard();
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
      console.log(data);
    })
    .fail(function(err){
      console.error(err);
    });

  }

    
  

}

// function loadDashboard() {
//   $.get('/dashboard/' + localStorage._id)
//   .done(function(items) {
//     var $tr = $('.userItemTr').clone();
//     var $itemName = $('.itemName').text('RACHEL');

//     $('.userItemsTbody').append($tr);
    
//   })
//   .fail(function(err) {
//     console.error(err);
//   });
// }