export default class ChatFire {

  chatListen(chatRef, flux) {
    chatRef.orderByKey().limitToLast(10).on('child_added', function(snapshot) { // dguillamot - only fetch last 10 chat messages
      flux.getActions('chatactions').newChatReceived(snapshot.val()); 
    });
  }

  chatAdd(chatRef, chatObj) {
    chatRef.push(chatObj, function(err, snapshot) {
    });
  }

}

