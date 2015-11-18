'use strict';

$(document).ready(init);

function init() {
  $('.register').click(register);
}

function register() {

  if(user.password1 !== user.password2) {
    $('.feedback').text("Passwords don't match. Please try again.")
    $('.registerPasswordInput').val('');
    $('.registerConfirmPasswordInput').val('');
    $('.registerPasswordInput').addClass('incorrect');
    $('.registerConfirmPasswordInput').addClass('incorrect');
  } else {
      var user = {
      username: $('.registerUsernameInput').val(),
      password: $('.registerPasswordInput').val(),
      name: $('registerNameInput').val(),
      email: $('registerEmailInput').val(),
      phone: $('registerPhoneInput').val()
    }
    $.post('/register', user)
    .done(function(data) {

    })
    .fail(function(err) {

    });

  }

  

  
}

