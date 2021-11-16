# CoolBux API Wrapper
A Promise-based API Wrapper for NodeJS.
Please contact saipeaks#8059 for bugs.

[Site Link](https://coolbux.live/)

## Table of Contents

- [Installation](#Installation)
- [How to Use](#how-to-use)
- [Examples](#examples)
- [Documentation](#documentation)

## Installation

Using npm:
```bash
$ npm install coolbux-wrapper
```

## How to Use

Import the Module:
```js
// Requires the CoolBux Wrapper Module.
const Module = require('coolbux-wrapper')
```

Create a new APIWrapper Instance:
```js
// Creates a new Wrapper Instance.
const Wrapper = new Module.APIWrapper()
```

Create a new CoolBuxUser Instance:

```js
// Creates a new CoolBuxUser Instance with the username "ROBLOX".
const User = new Module.CoolBuxUser({user: 'ROBLOX'})
```

## Examples

```js
/* !! This module uses JavaScript Promises. !! */

// There are many functions on this wrapper, one of which is the information function:
Wrapper.information({user: User}) // Gets the information of a CoolBux User.
    .then(console.log)
    .catch(console.error)

// Some may require your account pin, for example:
var User = new CoolBuxUser({ user: "ROBLOX", pin: "examplepin" })

Wrapper.validate({user: User}) // Checks if the pin "examplepin" is valid.
    .then(console.log)
    .catch(console.error)

// Some may require two CoolBuxUser Instances, for example:
var User = new CoolBuxUser({ user: "ROBLOX" })
var Referrer = new CoolBuxUser({ user: "builderman" })

Wrapper.register({ user: User, referrer: Referrer}) // Registers the User account with the referral of Referrer.
    .then(console.log)
    .catch(console.error)

// And some may require BTC/LTC wallet addresses, for example:
var User = new CoolBuxUser({ user: "ROBLOX", btcwallet: "examplebtcaddress", ltcwallet: "exampleltcaddress" })
Wrapper.payout({ user: User, method: 'btc', amount: 250 })
Wrapper.payout({ user: User, method: 'ltc', amount: 250 })
```

## Documentation
**NOTE: All these functions return raw JSON data from the official CoolBux API.**

Wrapper.claim({ user, type })
```js
// Claims the free rewards
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.claim({ user, type: "yt" }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ |User to perform action
type | string | 'yt' |   | Type of reward to redeem (yt, dc).

Wrapper.headshot({ user })
```js
// Gets the ROBLOX profile picture
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.headshot({ user }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action

Wrapper.history({ user })
```js
// Gets the CoolBux history
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.history({ user }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action

Wrapper.information({ user })
```js
// Gets the information
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.information({ user }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action

Wrapper.offers({ user })
```js
// Gets the offer balance
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.offers({ user }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action

Wrapper.payout({ user })
```js
// Pays out the ROBUX
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.payout({ user, method: 'rbx', amount: 100, force_v2: true}).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action
method | string | 'rbx' |   | Method of Payout (rbx, btc, ltc, gift, toy)
amount | number | 10 |   | Amount to pay out
force_v2 | boolean | false |   | Whether to use V2 API in ROBUX payouts

Wrapper.redeem({ user, code })
```js
// Redeems a Promocode
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.redeem({ user, code: "examplecode" }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action
code | string | None | ✔ | Promocode to redeem

Wrapper.referrals({ user })
```js
// Gets the referral statistics
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.referrals({ user }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action

Wrapper.register({ user, referrer})
```js
// Registers an account (with optional referrer)
var user = new CoolBuxUser({user: "ROBLOX"})
var referrer = new CoolBuxUser({user: "builderman"})
Wrapper.register({ user, referrer }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action
referrer | Object (CoolBuxUser) | None |   | Referrer to user

Wrapper.validate({ user })
```js
// Validates the PIN of User
var user = new CoolBuxUser({user: "ROBLOX", pin: "examplepin"})
Wrapper.validate({ user }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action

Wrapper.vip({ user })
```js
// Gets the VIP Payout Place
var user = new CoolBuxUser({user: "ROBLOX"})
Wrapper.vip({ user }).then(json => {/* ... */})
```

 Option | Type | Default | Required | Description 
 --- | --- | --- | --- | ---
user | Object (CoolBuxUser) | None | ✔ | User to perform action