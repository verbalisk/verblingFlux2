# Verbling Flux/React Challenge 2

## Version 2 - Server-less Firebase Chat Addon

### Background

This version has a Firebase chat component added - no server required. 

![alt tag](/demo.gif)

### Features

#### Firebase Chat Component

##### A note about multiple users

A very simple Firebase application has been setup here. Open index.html on several different computers (or tabs) and all users will be added to the same chatroom and can chat together. You can also open index.html in another tab of the current browser - but your spaceship has only one connection to Obi-Wan Kenobi's websocket server, so only one tab can get Obi-Wan's updates. Seperate spaceships (computers) with their own websocket server running on localhost will get their own Obi-Wan feed. Note - due to gravitational lensing in some star sytems, there may be a delay between what your spaceship receives from Obi-Wan's server and what another spaceship receives. ^^

##### Firebase implementation

Regarding the implementation, I added a 'chats' branch for new chat messages ({author, message}) and a 'users' branch for the list of online users ({username}). Users get pushed when the app starts up, and removed whenever the user leaves the page (including browser reload, browser close, earthquake, fire, aliens) using FirebaseRef.onDisconnect. 

##### Star Wars Character Bots

When user logs in, a very naive (rough) script kicks off, triggering a series of messages from the Star Wars character bots. When multiple users connect in a very short time frame, it can seem as the bots are repeating themselves. This should be improved upon in a later release. Having a bot respond to user message should also be simple enough. 

##### Authentication and Security/Rules not included

Normally the server would generate a custom auth token and pass it down to the user through isorphism, and the user would use that to authWithCustomToken. Security Rules setup on the Firebase instance would then limit read/writes accordingly. Since we do not have a server and I want to keep startup very simple, no authorization or rules are in place. My 'Fireman.js' utility class normally handles all of this authentication through Promises, but for now it has been left out and is a very shallow singleton class.

### Run

Open index.html in any browser (Chrome on Windows 7 tested).

### Build

install: npm install

build: npm run build

watch: npm run watch

### Usage

Try opening in multiple tabs or multiple computers. Notice onDisconnect and on connect updates happening. Chat by typing into the black box. 

### Author

Created by Daniel Guillamot - 2015-10-26