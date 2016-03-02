# OError

[![Build Status](https://travis-ci.org/woozyking/oerror.svg?branch=master)](https://travis-ci.org/woozyking/oerror)
[![Dependency Status](https://gemnasium.com/woozyking/oerror.svg)](https://gemnasium.com/woozyking/oerror)
[![Test Coverage](https://codeclimate.com/github/woozyking/oerror/badges/coverage.svg)](https://codeclimate.com/github/woozyking/oerror/coverage)
[![Code Climate](https://codeclimate.com/github/woozyking/oerror/badges/gpa.svg)](https://codeclimate.com/github/woozyking/oerror)

Customizable Error using an Object. It is a subclass of Node.js standard [`Class: Error`](https://nodejs.org/api/errors.html), with the overridden behavior when the constructor argument is a plain key-value `Object`.

## Install

`npm install -save oerror`

## Usage

```javascript
var OError = require('./oerror');

var err = new OError({
  name: 'ServerError',
  statusCode: 500,
  message: 'DB Connection Lost',
  details: {
    component: 'MongoDB',
    timeout: 15000
  }
});

/* Type */
console.log(err instanceof OError); // true
console.log(err instanceof Error); // true

/* Inherited Properties */
console.log(err.message); // DB Connection Lost
console.log(err.name); // ServerError
console.error(err.stack);
// ServerError: DB Connection Lost
//     at Object.<anonymous> (/Users/woozyking/proj/personal/oerror/test.js:3:11)
//     at Module._compile (module.js:413:34)
//     at Object.Module._extensions..js (module.js:422:10)
//     at Module.load (module.js:357:32)
//     at Function.Module._load (module.js:314:12)
//     at Function.Module.runMain (module.js:447:10)
//     at startup (node.js:140:18)
//     at node.js:1001:3

/* Other Properties */
console.log(err.statusCode); // 500
console.log(err.details); // { component: 'MongoDB', timeout: 15000 }
console.log(err.details.component); // MongoDB
```

If you get too comfortable with `OError`:

```javascript
Error = require('oerror'); // USE WITH CAUTION
```

## Properties

`Class: OError` inherits the following standard properties from `Error`:

* `name` - when supplied through the constructor argument, it gets used; otherwise defaults to `OError`.
* `message` - this behaves as the standard Error constructor argument, which specifies the error message. Although not required, it is recommended to set it.
* `stack` - see [Usage](#usage) for example. It cannot be overridden even constructor argument contains one.

All other properties that are unowned by `Error` (therefore also `OError`) type will get copied over, see [Usage](#usage) for example.

## Behaviors

```
Class: OError
  new OError(opt)
    ✓ should create an instance of OError when opt is a plain object.
    ✓ should return an Error object when opt is an Error object.
    ✓ should return an OError object when opt is an OError object.
    ✓ should return an Error object when opt is a string.
    ✓ should return an OError object when opt is null.
    ✓ should return an Error object when opt is not a plain object, string, null, or Error (including Error subclasses).
  oerror.name
    ✓ should have the name property default to "OError"
    ✓ should have the name property set to opt.name value
  oerror.message
    ✓ should have the message property default to ""
    ✓ should have the message property set to opt.message value
  oerror.stack
    ✓ cannot be overridden by constructor argument opt.stack
    ✓ should contain <name>: <message> in the first line
  oerror.<others>
    ✓ should copy over all Error unowned properties from opt
```
