'use strict';

$(document).ready(init);

function init() {
  console.log('jQuery works');
  loadProfile();
}

function loadProfile() {
  $.get('/dashboard/' + localStorage.token)
  .done(function(dashboard) {
    console.log("Dashboard loaded.");
  })
  .fail(function(err) {
    console.error(err);
  });
}