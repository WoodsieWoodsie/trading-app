'use strict';

$(document).ready(init);

function init() {
  console.log('jQuery works');
  loadProfile();
}

function loadProfile() {
  $.get('/profile')
  .done(function(profilePage) {
    console.log("Profile page loaded.");
  })
  .fail(function(err) {
    console.error(err);
  });
}