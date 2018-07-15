var socket = io();


function scrollToBottom () {
  //Selects
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child")

  //heightss
  var clientHeight= messages.prop("clientHeight");
  var scrollTop= messages.prop("scrollTop");
  var scrollHeight= messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit("join", params, function (err) {
    if(err){
      alert("Error: please enter a valid name and room name");
      window.location.href="/";
    }else{

    }
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on("updateUserList", function (users) {
  var ol = jQuery("<ul></ul>");

  users.forEach(function (user) {
    ol.append(jQuery("<li></li>").text(user));
  })

  jQuery('#users').html(ol);
})

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    at: formattedTime
  });


  jQuery('#messages').append(html);
  scrollToBottom();
  //
  // var li = jQuery('<li></li>');
  // li.text(`${formattedTime} | ${message.from}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    link: message.url,
    from: message.from,
    at: formattedTime
  });


  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messagetextbox = jQuery('[name=message]')
  if (messagetextbox.val() == "" || messagetextbox.val().trim().length == 0){
    return;
  }
  socket.emit('createMessage', {
    text: messagetextbox.val()
  }, function () {
    messagetextbox.val("")
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
  if (!navigator.geolocation){
    return alert("Error: Your browser does not support this!");
  }

  locationButton.attr("disabled","disabled").text("Sending location...")
  navigator.geolocation.getCurrentPosition(function (pos) {
    locationButton.removeAttr("disabled").text("Send location");
    socket.emit("createLocationMessage", {
      lat : pos.coords.latitude,
      long: pos.coords.longitude
    });
  }, function (){
    alert("Error: Unable to get location!")
    locationButton.removeAttr("disabled").text("Send location");
  })
});
