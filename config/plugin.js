'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  }
};
