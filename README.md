# Set Up

* `npm install`
* `bower install`
* `npm start`
* Browser: `http://localhost:3000`

# Word War Modules

## wordWar.login

### `onUsernameEntered(handler:function)`
The `handler` function will be called when the user hits Enter in the user name input field. The
`handler` function will receive one argument, the submitted `username:string`.

### `$loggedIn:boolean`
A state variable telling the game whether the user is logged in. When set to `true`,
it will trigger the rendering of the word input field, the letter grid and the remaining time.

## wordWar.letterGrid

### `onWordEntered(handler:function)`
The `handler` function will be called when the user hits Enter in the word input field. The
`handler` function will receive one argument, the submitted `word:string`.

### `$letters:string[]`
Sets the letters displayed in the letter grid. When set, it will trigger a re-rendering of the
letter grid.

## wordWar.remainingTime

### `$secondsRemaining`
Sets the remaining seconds of the current round. When set, it will trigger a re-rendering of the
timer at the bottom of the main screen.

## wordWar.highscore

### `$username:string`
Sets the name of the user who is active in the current instance of the game.

### `$users:object[]`
Sets the users displayed in the highscore list. When set, it will trigger a re-rendering of the
highscore list. An example of a `$users` object array is:

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

 Klient ber om å logge seg inn.

* name:string

### `newWord`

Klient foreslår et ord. Blir besvart med enten `wordOk`, `wordTaken` eller `wordInvalid`.

* word:string

### `state`

Klient ber om nåværende tilstand i spillet. Blir besvart med `currentState`.

* _Ingen parameter_

## Listen API

### `connected` (socket)
Bekreftelse fra tjener på at du har koblet deg til.

* welcomeMessage:string

### `userLoggedIn` (alle)

Ny klient har logget inn.

* user:\{ name:string, score:int, connected:boolean, id:int }

### `userLoggedOut` (alle)

En klient forlater spillet.

* user:\{ name:string, score:int, connected:boolean, id:int }


### `newRound` (alle)

Ny runde med nye bokstaver.

* letters:string[]

### `remainingTime` (alle)

Antall sekunder igjen av runden. Sendes hvert sekund.

* remainingTime:int

### `wordOk` (alle)

Et ord ble sendt inn og godtatt. Normalt trigget av at klient har sendt en `word`-melding.

* word:string

### `wordTaken` (socket)

Ordet har allerede blitt tatt. Normalt trigget av at klient har sendt en `word`-melding.

* word:string

### `wordInvalid` (socket)

Ordet er ikke gyldig. Enten fordi en eller flere bokstaver ikke er tilgjengelige, eller ordet ikke er et gyldig norsk ord. Normalt trigget av at klient har sendt en `word`-melding.

* word:string

### `scoreUpdate` (alle)

En bruker har fått nye poeng.

* user:\{ name:string, score:int, connected:boolean, id:int } 

### `sorry` (socket)

Feilmelding. Per i dag kun fordi du må logge inn.

* errorMessage:string