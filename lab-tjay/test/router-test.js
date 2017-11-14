'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const Villain = require('../model/villains.js');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;

let tempVillain;

describe('testing Villain Registry Routes, because... Villains :', () => {

  before(server.start);
  after(server.stop);

  //GET GET GET

  describe('testing GET routes :', () => {

    afterEach(() => Villain.remove({}));
    beforeEach(() => {
      return new Villain({
        name: 'Gio',
        traits: 'Pedantic',
      })
        .save()
        .then(villain => {
          tempVillain = villain;
        });
    });

    it('should return with 200 - Valid request, Valid id :', () => {
      return superagent.get(`${API_URL}/api/villains/${tempVillain._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempVillain._id);
          expect(res.body.name).toEqual(tempVillain.name);
          expect(res.body.traits).toEqual(tempVillain.traits);
          expect(new Date(res.body.logged)).toEqual(tempVillain.logged);
        });

    });

    it('should return with 404 - Valid request, no id :', () => {
      return superagent.get(`${API_URL}/api/villains/`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  //PUT PUT PUT - DONE

  describe('testing PUT routes :', () => {

    afterEach(() => Villain.remove({}));
    beforeEach(() => {
      return new Villain({
        name: 'Gio',
        traits: 'Pedantic',
      })
        .save()
        .then(villain => {
          tempVillain = villain;
        });
    });

    it('should return with 200 - Valid request, Valid id :', () => {
      return superagent.put(`${API_URL}/api/villains/${tempVillain._id}`)
        .send({name: 'Duncan', traits: 'AckAckAck'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempVillain._id);
          expect(res.body.name).toEqual('Duncan');
          expect(res.body.traits).toEqual('AckAckAck');
          expect(new Date(res.body.logged)).toEqual(tempVillain.logged);
        });
    });

    it('should return with 400 - invalid body :', () => {
      return superagent.put(`${API_URL}/api/villains/${tempVillain._id}`)
        .send({name: 12, traits: false})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should return with 404 - invalid id :', () => {
      return superagent.put(`${API_URL}/api/villains/8675309`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  //DELETE DELETE DELETE - DONE

  describe('testing DELETE routes :', () => {

    afterEach(() => Villain.remove({}));
    beforeEach(() => {
      return new Villain({
        name: 'Gio',
        traits: 'Pedantic',
      })
        .save()
        .then(villain => {
          tempVillain = villain;
        });
    });

    it('should return with 204 - Valid id :', () => {
      return superagent.delete(`${API_URL}/api/villains/${tempVillain._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    it('should return with 404 - invalid id :', () => {
      return superagent.delete(`${API_URL}/api/villains/8675309`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  //POST POST POST - DONE

  describe('testing POST routes :', () => {
    after(() => Villain.remove({}));

    let demoVillain = {
      name: 'Gio',
      traits: 'Pedantic',
    };

    it('should return with 200 - Valid request :', () => {
      return superagent.post(`${API_URL}/api/villains`)
        .send(demoVillain)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Gio');
          expect(res.body.traits).toEqual('Pedantic');
          expect(res.body.logged).toExist();
        });
    });

    it('should return with 400 - invalid body :', () => {
      return superagent.post(`${API_URL}/api/villains`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should return with 409 - unique ID conflict :', () => {
      return superagent.post(`${API_URL}/api/villains`)
        .send(demoVillain)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });

  });

  //404 404 404 - DONE

  describe('testing 404 catch-all route :', () => {
    it('should return with 404 - catch all :', () => {
      return superagent.post(`${API_URL}/`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });




});
