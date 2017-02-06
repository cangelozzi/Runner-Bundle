$(function () {
  $.getJSON('feedbackAPI', updateFeedback);

  // to create a POST event using jQuery
  $('.feedback-form').submit(function (e) {
    e.preventDefault();
    $.post('feedbackAPI', {
        name: $('#feedback-form-name').val(),
        event: $('#feedback-form-event').val(),
        message: $('#feedback-form-message').val()
      },
      /* update feedback in the DOM*/
      updateFeedback)

  });

    // CLICK event to Delete feedback message
    $('.feedback-messages').on('click', function(e) {
       console.log(e.target.className)
      if (e.target.classList.contains ('feedback-delete')) {
        
        var id = e.target.querySelector('span').id
        
        $.ajax({
          url: 'feedbackAPI/' + id, // the target is a delete button
          type: 'DELETE',
          success: updateFeedback
        }); 
      } 
});  
  
  
  

  function updateFeedback(data) {
    var output = '';
    $.each(data, function (key, item) {
     
      output += '     <div class="feedback-item item-list media-list">';
      output += '       <div class="feedback-item media">';
      output += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
      output += '         <div class="feedback-info media-body">';
      output += '           <div class="feedback-head">';
      output += '             <div class="feedback-title">' + item.event + '<small class="feedback-name label label-info"></small></div>';
      output += '           </div>';
      output += '           <div class="feedback-message">' + item.message + '<p><em>' + item.name + '</p></em></div>';
      output += '         </div>';
      output += '       </div>';
      output += '     </div>';
    });
    $('.feedback-messages').html(output);
  }
});