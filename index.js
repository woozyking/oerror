var _Error = Error;

/*
  Customizable Error using an Object.

  Class: OError

  It is a subclass of Node.js standard Class: Error, with the overridden
  behavior when the constructor argument is a plain key-value `Object`.

  new OError(opt)

  Creates a new OError object when opt is an object, unless the object is an
  instance of Error, in which case opt itself is returned, otherwise returns a
  plain Error object with its standard behavior.

  Special properties from argument opt:
    * opt.message - this behaves as the standard Error constructor argument,
                    which specifies the error message. Although not required,
                    it is recommended to set it.
    * opt.name - this is used to give a different identity for the resulting
                 error, which can be seen when toString method is called, or in
                 the resulting error stack property. Defaults to 'OError'.
*/
var OError = function(opt) {
  // return opt back directly if it's an Error object
  if (opt instanceof _Error) {
    return opt;
  }

  if (typeof opt !== 'object' || Array.isArray(opt)) {
    return new _Error(opt);
  }

  _Error.captureStackTrace(this, this.constructor);

  opt = opt || {};

  // override name property
  this.name = opt.name || 'OError';

  // override message property only when applicable
  this.message = opt.message || '';

  // copy over all other properties
  var self = this;

  Object.keys(opt).forEach(function(key) {
    if (!(key in self)) {
      self[key] = opt[key];
    }
  });
};
require('util').inherits(OError, _Error);

module.exports = OError;
