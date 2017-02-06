// get Socket to share chat messages
var socket = io();

// connect Socket to the event, so that the event below happens only if there is a connection with Socket
socket.on('connect', function () {

  // document.forms ...has the list of all the form in the document
  // ...with chatForm (form name), I am looking just at the form related to the chat
  var chatForm = document.forms.chatForm;

  // create listening event on the chat-form
  if (chatForm) {
    var chatUsername = document.querySelector('#chat-username');
    var chatMessage = document.querySelector('#chat-message');

    // event listner using just JS
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // emit and broadcast messages
      socket.emit('postMessage', {
        username: chatUsername.value,
        message: chatMessage.value,
      });
      // put back the form to empty
      chatMessage.value = '';
      chatMessage.focus();
    });
    socket.on('updateMessage', function(data){
      showMessage(data);
    });
  }
});

// create function that display the message
function showMessage(data) {
  // select where is the display
  var chatDisplay = document.querySelector('.chat-display');
  // create a p element
  var newMessage = document.createElement('p');
  // assign to it a class
  newMessage.className = 'bg-success chat-text';
  // put it to the DOM
  newMessage.innerHTML = '<strong>' + data.username + '</strong>: ' + data.message;
  // insert always before the last one.
  chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);

}