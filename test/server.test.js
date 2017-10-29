'use strict';

process.env.PORT = 4000;
const superagent = require('superagent');
const expect = require('expect');
const fs = require('fs');

describe('api/notes', function() {

  let noteID = '';

  beforeAll((done) => {
    require('../lib/_server').start(process.env.PORT);
    //create test file for note
    const testNote = __dirname + '/./test.json';
    const store = require('../lib/storage')(testNote);
    done();
  });
  afterAll((done) => {

    //delete test file for note
    fs.unlinkSync(__dirname + '/./test.json');
    require('../lib/_server').stop();
    done();
  });


  describe('POST /api/notes', () => {

    test('should respond with a 200', () => {

      return superagent.post('http://localhost:4000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Fred Flintstone',
        content: 'Stone Mover',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Fred Flintstone');
        expect(res.body.content).toEqual('Stone Mover');
        noteID = res.body.id;
      });

    });

    test('should respond with a 200', () => {

      return superagent.post('http://localhost:4000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Bob Barker',
        content: 'Game Show Host',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Bob Barker');
        expect(res.body.content).toEqual('Game Show Host');
        noteID = res.body.id;
      });

    });

    test('should respond with a 400 if title is not given', () => {

      return superagent.post('http://localhost:4000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        content: 'Some famous actress',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    test('should respond with a 400 if content is not given', () =>{

      return superagent.post('http://localhost:4000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Michael Jackson',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });


  describe('GET /api/notes', () => {

    test('should return a 404 for an unregistered route', () => {

      return superagent.get('http://localhost:4000/api/goats')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });


    test('should return an array of note IDs if no id is given', () => {

      return superagent.get(`http://localhost:4000/api/notes`)
      .then(res => {
        expect(res.body).toContain(noteID);
        expect(res.status).toEqual(200);
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    test('should return a 404 for valid request w/id that is not found', () => {

      let badID = 'd61c3640-ba07-11e7-8981-41575cf111bp';
      return superagent.get(`http://localhost:4000/api/notes?id=${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });

    test('should return a 200 for a valid note id', () => {
      return superagent.get(`http://localhost:4000/api/notes?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });

  });

  describe('PUT /api/notes', () => {

    test('should update title + content of note (keep ID) + respond with a 200', () => {

      return superagent.put(`http://localhost:4000/api/notes?id=${noteID}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Barney Rubble',
        content: 'Annoying Minion',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Barney Rubble');
        expect(res.body.content).toEqual('Annoying Minion');
        expect(res.body.id).toEqual(noteID); //ID is unchanged
        noteID = res.body.id;
      });

    });
  });

  describe('DELETE /api/notes', () => {

    test('should respond with a 204 and delete the specified note', () => {

      return superagent.delete(`http://localhost:4000/api/notes?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
  });

});
