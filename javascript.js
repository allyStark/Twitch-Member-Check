var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "moonduckTV", "asdjf843ytwodaw"];

var profileHTML = "";

  for (var i = 0; i < streamers.length; i++) {

    getUserInfo(streamers[i]);

  }

  $(document).ajaxStop(function() {

    $("#myDiv").html(profileHTML);

  });

function addText(profileHTML, backgroundColor, profilePicture, channelAddress, nameIs, isOnline) {

  profileHTML += '<div class="container profileContainer ' + backgroundColor + '"><div class="row"><div class="col"><img src= "' + profilePicture + '"></div><div class="col playerName"><a href="' + channelAddress + '">' + nameIs + '</a></div><div class="col streamInfo">' + isOnline + '</div></div></div>';

  return profileHTML;

}

function getUserInfo(userName) {

  $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + userName + "?callback=?", function(data) {

    var profilePicture = "";

    var channelAddress = data._links.channel;

    var nameIs = channelAddress.lastIndexOf('/') + 1;

    nameIs = channelAddress.slice(nameIs, channelAddress.length);

    var backgroundColor = "off";

    var isOnline = "Offline";

    if (data.stream !== null) {

      profilePicture = data.stream.channel.logo;
      isOnline = data.stream.channel.status;
      backgroundColor = "on";

      profileHTML = addText(profileHTML, backgroundColor, profilePicture, channelAddress, nameIs, isOnline);

    } else {

      $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + nameIs + "?callback=?", function(data) {

        if (data.status === 404) {

          profilePicture = "http://loganfuneralchapel.com/wp-content/uploads/2017/01/generic-profile-avatar_352864.jpg";
          isOnline = "";
          channelAddress = "";
          nameIs += " does not exist!";

        } else {

          profilePicture = data.logo;

        }

        profileHTML = addText(profileHTML, backgroundColor, profilePicture, channelAddress, nameIs, isOnline);

      });

    }

  });

}