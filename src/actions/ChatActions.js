import Fireman from '../firebase/Fireman';

var ChatActions = {
  listenForChats: function(flux) {
    var fireman = new Fireman();
    fireman.listenForChats(flux);
  },
  
  newChatReceived: function(chatObj) {
  	return chatObj;
  },

  addChat: function(chatObj) {
  	var fireman = new Fireman();
  	fireman.addChat(chatObj);
  },





  scriptTriggerUserLoggedInChats: function(loginObj) {
    var fireman = new Fireman();

    setTimeout(function (){
      var chatObj = {
        author: 'Leia',
        message: 'Welcome to the Rebel Alliance #StarChat, ' + loginObj.username
      };
      fireman.addChat(chatObj);
      setTimeout(function(){
        var chatObj = {
          author: 'Chewy',
          message: 'hhhrrrrrrraaaaaaaaaeeerrrr!'
        };
        fireman.addChat(chatObj);
        setTimeout(function(){
          var chatObj = {
            author: 'Luke',
            message: 'quiet, Chewy'
          };
          fireman.addChat(chatObj);
          setTimeout(function(){
            var chatObj = {
              author: 'JarJar',
              message: 'Mesa called Jar-Jar Binks. Mesa your humble servant.'
            };
            fireman.addChat(chatObj);
            setTimeout(function(){
              var chatObj = {
                author: 'Yoda',
                message: 'Truly wonderful, the mind of a child is.'
              };
              fireman.addChat(chatObj);
              setTimeout(function(){
                var chatObj = {
                  author: 'Han',
                  message: 'I wonder where Obi-Wan is heading to next.'
                };
                fireman.addChat(chatObj);
                setTimeout(function(){
                  var chatObj = {
                    author: 'Luke',
                    message: 'Off to find another Sith emblem no doubt.'
                  };
                  fireman.addChat(chatObj);
                  setTimeout(function(){
                    var chatObj = {
                      author: 'Chewy',
                      message: 'Uuuuu-ahhhrr-uhhrr-aaaaaargghhg!'
                    };
                    fireman.addChat(chatObj);
                    setTimeout(function(){
                      var chatObj = {
                        author: 'Chewy',
                        message: 'Uuuuu-ahhhrr-uhhrr-aaaaaargghhg!!!'
                      };
                      fireman.addChat(chatObj);
                      setTimeout(function(){
                        var chatObj = {
                          author: 'Leia',
                          message: 'Vad gör du, Luke?'
                        };
                        fireman.addChat(chatObj);
                        setTimeout(function(){
                          var chatObj = {
                            author: 'Luke',
                            message: 'Lämna mig ifred Leia..'
                          };
                          fireman.addChat(chatObj);
                          setTimeout(function(){
                            var chatObj = {
                              author: 'Leia',
                              message: loginObj.username + ', you can send a message to nearby star systems by typing into the black box at the bottom of the chat panel.'
                            };
                            fireman.addChat(chatObj);
                          }, 3500);
                        }, 3500);
                      }, 3500);
                    }, 2500);
                  }, 2500);
                }, 3500);
              }, 6500);
            }, 6500);
          }, 2500);
        }, 2500);
      }, 3500);
    }, 3500);
  }
}

export default ChatActions;