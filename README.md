# Set Up

* `npm install`
* `bower install`
* `npm start`
* Browser: `http://localhost:3000`

# Word War Modules

## wordWar.login

### `onUsernameEntered(handler:function)`
The `handler` function will be called when the user hits Enter in the user name input field. The
`handler` function will receive one argument, the input element `inputElement:HTMLInputElement`.
The actual username can be fetched with `inputElement.value`.

### `loggedIn:boolean`
A state variable telling the game whether the user is logged in. When set to `true`,
it will trigger the rendering of the word input field, the letter grid and the remaining time.

## wordWar.letterGrid

### `onWordEntered(handler:function)`
The `handler` function will be called when the user hits Enter in the word input field. The
`handler` function will receive one argument, the input element (`inputElement:HTMLInputElement`).
The actual word can be fetched with `inputElement.value`.

### `letters:string[]`
Sets the letters displayed in the letter grid. When set, it will trigger a re-rendering of the
letter grid.

## wordWar.remainingTime

### `secondsRemaining:Number`
Sets the remaining seconds of the current round. When set, it will trigger a re-rendering of the
timer at the bottom of the main screen.

## wordWar.highscore

### `avatarHost:string`
Sets the host of the avatars provided by the API. Usually set to the same as the WebSocket
server host.

### `username:string`
Sets the name of the user who is active in the current instance of the game.

### `users:object[]`
Sets the users displayed in the highscore list. When set, it will trigger a re-rendering of the
highscore list. An example of a `users` object array is:

    [
        {
            id: 1,
            name: 'mikkels',
            connected: true,
            score: 14,
            current: true,
            avatar: 'superman.png',
            updated: true
        },
        {
            id: 1,
            name: 'per',
            connected: false,
            score: 14,
            avatar: 'superman.png'
        }
    ]

_Note 1: Set a user's property `current` to `true` to indicate that the user in question is the
user active in the current window. This will set the color of the small circle icon to yellow._

_Note 2: Set a user's property `updated` to `true` if you want a subtle animation for that user
after re-rendering. Can be useful if you want to display to the client that the user's score has
been updated._

## wordWar.console

### `addEntry(entry:object)`
Adds a new entry to the console window. When adding, the console window will be automatically
re-rendered. An example of an `entry` object is:

    {
        user: 'arildt',
        type: 'success',
        tag: 'nytt ord',
        message: 'kanne (7p)'
    }

_Note: `type` can be either 'success', 'warning' or 'info'._

# WebSocket API

## Emit API

### `login`

Client attempts to log in.

* name:string

### `newWord`

Client proposes a word. Depending on the validity of the word, the server will answer with either
of the following events: `wordOk`, `wordTaken` or `wordInvalid`.

* word:string

### `state`

Client requests the current state of the game. The server will answer with the `currentState`
event.

* _Ingen parameter_

## Listen API

### `connected` (socket)

Confirmation from the server that the client has connected.

* welcomeMessage:string

### `userLoggedIn` (all)

A new client has logged in.

* user:\{ name:string, score:int, connected:boolean, id:int }

### `userLoggedOut` (all)

A client logs out/leaves the game.

* user:\{ name:string, score:int, connected:boolean, id:int }


### `newRound` (all)

The server announces a new round and provides a new set of letters.

* letters:string[]

### `remainingTime` (all)

The server announces the remaining time of the current round. The event is broadcasted every
second.

* remainingTime:int

### `wordOk` (all)

A word was proposed by a client and verified by the server. The event is originally triggered by
one of the clients sending a `newWord` message.

* word:string

### `wordTaken` (socket)

The proposed word has already been taken. The event is originally triggered by one of the clients
sending a `newWord` message.

* word:string

### `wordInvalid` (socket)

The proposed word is not valid, either because one or more letters are not available,
or the word is not a valid Norwegian word. The event is originally triggered by one of the
clients sending a `newWord` message.

* word:string

### `scoreUpdate` (all)

A user has received or lost points.

* user:\{ name:string, score:int, connected:boolean, id:int } 

### `sorry` (socket)

Error message. Today, this event is only sent if the client requests something before logging in.

* errorMessage:string