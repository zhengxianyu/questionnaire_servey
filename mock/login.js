'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

module.exports = {

  'POST /user/login' (req, res) {
    const data = mockjs.mock({
        'id': 1,
        'userName': "zxy",
        'password': "1006",
    });
    setTimeout(function () {
      res.json({
        success: true,
        data: data,
      });
    }, 500);
  },

};
