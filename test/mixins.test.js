'use strict';

var utils = require('..'),
    mixins = utils.mixins,
    expect = require('chai').expect;

describe('Mixins', function () {
  /* jshint expr: true */

  describe('at()', function () {

    it('should return the value of a top-level property', function () {
      var o = { a: { b: { c: 'Yay!' } } };
      expect(mixins.at(o, 'a')).to.be.equal(o.a);
    });

    it('should return the value of a second-level property', function () {
      var o = { a: { b: { c: 'Yay!' } } };
      expect(mixins.at(o, 'a.b')).to.be.equal(o.a.b);
    });

    it('should return the value of a third-level property', function () {
      var o = { a: { b: { c: 'Yay!' } } };
      expect(mixins.at(o, 'a.b.c')).to.be.equal(o.a.b.c);
    });

    it('should return undefined if a top-level property does not exist', function () {
      var o = { a: { b: { c: 'Yay!' } } };
      expect(mixins.at(o, 'x') === undefined).to.be.true;
    });

    it('should return undefined if a second-level property does not exist', function () {
      var o = { a: { b: { c: 'Yay!' } } };
      expect(mixins.at(o, 'a.x') === undefined).to.be.true;
    });

    it('should return undefined if a third-level property does not exist', function () {
      var o = { a: { b: { c: 'Yay!' } } };
      expect(mixins.at(o, 'a.b.x') === undefined).to.be.true;
    });

  });

  describe('arrgs()', function () {

    function dummy() {
      return mixins.arrgs(arguments);
    }

    it('should convert an arguments object to an array', function () {
      expect(dummy(1, 2, 3, 4)).to.be.eql([1, 2, 3, 4]);
    });

    it('should return an empty array if invoked with an empty arguments object', function () {
      expect(dummy()).to.be.empty;
    });

    it('should return an empty array if invoked with a non-arguments object', function () {
      expect(mixins.arrgs({foo: 34343})).to.be.empty;
    });

    it('should return the specified array if invoked with an array as argument', function () {
      expect(dummy([1, 2, 3, 4])).to.be.eql([1, 2, 3, 4]);
    });

  });

  describe('except()', function () {

    it('should return a copy of the source object without the specified properties', function () {
      var src = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
      expect(mixins.except(src, 'a', 'b', 'c')).to.be.eql({'d': 4});
    });

    it('should return a copy of the source object without the specified properties array', function () {
      var src = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
      expect(mixins.except(src, ['a', 'b', 'c'])).to.be.eql({'d': 4});
    });

    it('should return the source object if no property names are specified', function () {
      var src = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
      expect(mixins.except(src)).to.be.eql(src);
    });

    it('should return the source object if property names do not exist on source object', function () {
      var src = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
      expect(mixins.except(src, 'x', 'y', 'z')).to.be.eql(src);
    });

    it('should ignore properties to exclude which do not exist on source object', function () {
      var src = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
      expect(mixins.except(src, 'x', 'd')).to.be.eql({'a': 1, 'b': 2, 'c': 3});
    });

  });

});
