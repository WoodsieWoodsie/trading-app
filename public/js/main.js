'use strict';

$(document).ready(init);

function init() {
  $('.register').click(register);
  $('.login').click(login);
}

function login() {
  var user = {
    username: $('.loginUsernameInput').val(),
    password: $('.loginPasswordInput').val()
  };
  if(!user.username.length || !user.password.length) {
    $('.feedback').text('Please enter a username and password.');
  } else {
    $.post('/login', user)
    .done(function(data) {
      localStorage._id = data._id;
      window.location.replace('/dashboard');

    })
    .fail(function(err) {
      console.log(err);

    });
  }


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
      localStorage._id = data.toString();
      window.location.replace('/dashboard');

    })
    .fail(function(err) {
      $('.feedback').text('Username is already taken.');

    });

  }

  

  
}

