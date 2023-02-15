const {assert} = require('chai');
const request = require('supertest')
const express = require('express');
const app = express();

describe("/Get products", function () {

    it('should get all the products', function(done) {
     return request(app)
          .get("/products")
          .expect(200, done)
      })
    });