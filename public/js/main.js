'use strict';

$(document).ready(init);

function init() {
  $('.register').click(register);
}

function register() {
  var user = {
    username: $().val(),
    password1: $().val(),
    password2: $().val(),
    name: $().val(),
    email: $().val(),
    phone: $().val()
  }
  $.post()
}

