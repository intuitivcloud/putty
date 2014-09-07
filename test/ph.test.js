'use strict';

var expect = require('chai').expect,
    Q = require('q'),
    ph = require('..').ph;

function callbackFn(num, cb) {
  if (num % 2 === 0) return cb(null, true);
  return cb({error: 'Must pass even number'});
}

describe('ph', function () {
  /* jshint expr: true */

  describe('cb2promise()', function () {

    it('should return a promise for a callback style method', function () {
      var p = ph.cb2promise(callbackFn, 2);
      expect(Q.isPromise(p)).to.be.true;
    });

    it('should resolve promise if callback function succeeds', function (done) {

      ph.cb2promise(callbackFn, 2).then(function (r) {
        expect(r).to.be.true;
        done();
      }, function (e) {
        done(e);
      });

    });

    it('should reject the promise if callback function returns error', function (done) {

      ph.cb2promise(callbackFn, 3).then(function () {
        done('Should reject promise');
      }, function (e) {
        expect(e.error).to.be.equal('Must pass even number');
        done();
      });

    });

  });

  describe('makePromise()', function () {

    it('should return a promise for the specified work', function () {
      var p = ph.makePromise(function () {});
      expect(Q.isPromise(p)).to.be.true;
    });

    it('should resolve the promise if the work succeeds', function (done) {

      ph.makePromise(function (res, rej) {
        callbackFn(2, function (err, r) {
          if (err) return rej(err);
          return res(r);
        });
      }).then(function (r) {
        expect(r).to.be.true;
        done();
      }, function (e) { done(e); });

    });

    it('should reject the promise if the work fails', function (done) {

      ph.makePromise(function (res, rej) {
        callbackFn(3, function (err, r) {
          if (err) return rej(err);
          return res(r);
        });
      }).then(function () {
        done('Must reject this promise');
      }, function (e) {
        expect(e.error).to.be.equal('Must pass even number');
        done();
      });

    });

  });

  describe('allCompleted()', function () {
    
    it('should be an alias for Q.allSettled()', function () {
      expect(ph.allCompleted).to.be.eql(Q.allSettled);
    });

  });

});
