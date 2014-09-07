'use strict';

exports.isPromiseFulfilled = function (p) {
  return p.state === 'fulfilled';
};
