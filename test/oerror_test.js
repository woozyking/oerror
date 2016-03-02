var assert = require('assert');

// test target
var OError = require('../index');

describe('Class: OError', function() {
  describe('new OError(opt)', function() {
    it('should create an instance of OError when opt is a plain object.', function() {
      var err = new OError({
        message: 'LOL'
      });
      assert(err instanceof OError);
      assert(err instanceof Error);
    });

    it('should return an Error object when opt is an Error object.', function() {
      var err = new OError(new Error());
      assert(!(err instanceof OError));
      assert(err instanceof Error);
    });

    it('should return an OError object when opt is an OError object.', function() {
      var err = new OError(new OError({}));
      assert(err instanceof OError);
      assert(err instanceof Error);
    });

    it('should return an Error object when opt is a string.', function() {
      var err = new OError('LOL');
      assert(!(err instanceof OError));
      assert(err instanceof Error);
    });

    it('should return an OError object when opt is null.', function() {
      var err = new OError(null);
      assert(err instanceof OError);
      assert(err instanceof Error);
    });

    it('should return an Error object when opt is not a plain object, string, null, or Error (including Error subclasses).', function() {
      [[], undefined, 123, -12.3].forEach(function(opt) {
        var err = new OError(opt);
        assert(!(err instanceof OError), 'Opt:' + opt);
        assert(err instanceof Error, 'Opt:' + opt);
      });
    });
  });

  describe('oerror.name', function() {
    it('should have the name property default to "OError"', function() {
      var err = new OError({});
      assert(err.name === 'OError');
    });

    it('should have the name property set to opt.name value', function() {
      var err = new OError({
        name: 'LOL'
      });
      assert(err.name === 'LOL');
    });
  });

  describe('oerror.message', function() {
    it('should have the message property default to ""', function() {
      var err = new OError({});
      assert(err.message === '');
    });

    it('should have the message property set to opt.message value', function() {
      var err = new OError({
        message: 'Dota 2'
      });
      assert(err.message === 'Dota 2');
    });
  });

  describe('oerror.stack', function() {
    it('cannot be overridden by constructor argument opt.stack', function() {
      var err = new OError({
        stack: 'Can It Be Overridden?'
      });
      assert(err.stack.indexOf('Can It Be Overridden') < 0);
    });

    it('should contain <name>: <message> in the first line', function() {
      var err = new OError({
        name: 'TestError',
        message: 'Test Message'
      });
      assert(err.stack.indexOf('TestError: Test Message') === 0);
    });
  });

  describe('oerror.<others>', function() {
    it('should copy over all Error unowned properties from opt', function() {
      var err = new OError({
        statusCode: 500,
        details: {
          type: 'DB Connection',
          component: 'MongoDB'
        }
      });
      assert(err.statusCode === 500);
      assert.deepEqual(err.details, {
        type: 'DB Connection',
        component: 'MongoDB'
      });
    });
  });
});
