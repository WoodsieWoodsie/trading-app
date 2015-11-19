'use strict';

$(document).ready(init);

function init() {
  $('.register').click(register);
}

function register() {

  if($('.registerPasswordInput').val() !== $('.registerConfirmPasswordInput').val()) {
    $('.feedback').text("Passwords don't match. Please try again.")
    $('.registerPasswordInput').val('');
    $('.registerConfirmPasswordInput').val('');
    $('.registerPasswordInput').addClass('incorrect');
    $('.registerConfirmPasswordInput').addClass('incorrect');
  } else {
      var user = {
      username: $('.registerUsernameInput').val(),
      password: $('.registerPasswordInput').val(),
      name: $('.registerNameInput').val(),
      email: $('.registerEmailInput').val(),
      phone: $('.registerPhoneInput').val()
    }
    $.post('/register', user)
    .done(function(data) {
      localStorage.token = data;
      window.location.replace('/dashboard/' + localStorage.token);

    })
    .fail(function(err) {
      $('.feedback').text('Username is already taken.');

    });

  }

  

  
}

