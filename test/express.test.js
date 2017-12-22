'use strict';



const superagent = require('superagent');
const expect = require('expect');
process.env.PORT = 5500;



describe('api/notes', function() {
  let noteID = '';

  beforeAll((done) => {
    require('../lib/_server').start(process.env.PORT);
    done();
  });

  afterAll((done) => {
    require('../lib/_server').close();
    done();
  });



  describe('POST /api/notes', () => {
    test('should respond with 200', () => {
      
    })
  })
})
