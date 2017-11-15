'use strict';



const server = require ('../lib/server.js');
const Music = require ('../model/music.js');
const Genre = require ('../model/genre.js');
const superagent = require ('superagent');



describe ('lab 12 test', function () {
  beforeAll ( () => {
    server.start ();
    return Genre.remove ( {} );
  });


  beforeAll ( () => {
    return Music.remove ( {} );
  });


  afterAll ( () => {
    server.stop ();
  });


  let genreID;
  let musicID;


  describe ('should error invalid route', function () {
    test ('should show 404', function () {
      return superagent.get ('http://localhost:3000')
      .then (Promise.reject)
      .catch (res => {
        expect (res.status).toBe (404);
      });
    });


    describe ('should create genre', function () {
      test ('create new genre', function () {
        return superagent.post ('http://localhost:3000/genre')
        .set ('content-type', 'application / json')
        .send ( {
          name : 'jazz',
        })

        .then (res => {
          let text = JSON.parse (res.text);
          genreID = text.id;
          expect (res.status).toEqual ('jazz');
          expect (text.id).not.toBe (null);
        });
      });


      test ('should error 400 no name', function () {
        return superagent.post ('http://localhost:3000/genre')
        .then (Promise.reject)
        .catch (res => {
          expect (res.status).toBe (400);
        });
      });


      describe ('should genre call', function () {
        test ('success call by id', function () {
          return superagent.get ('http://localhost:3000/genre')
          .then (res => {
            let text = JSON.parse (res.text);
            expect (res.status).toEqual (200);
            expect (text.name).toEqual ('jazz');
            expect (text.id).toEqual (genreID);
          });
        });


        test ('should accept genre by id', function () {
          return superagent.get ('http://localhost:3000/genre')
          .then (res => {
            let text = JSON.parse (res.text);
            expect (res.status).toEqual (200);
            expect (text.name).toEqual ('jazz');
            expect (text.id).toEqual (genreID);
          });
        });
      });


      test ('should return array', function () {
        return superagent.get ('http://localhost:3000/genre')
        .then (res => {
          let text = JSON.parse (res.text);
          expect (res.status).toEqual (200);
          expect (Array.toBeArray ([text])).toBe (true);
        });
      });
    });


    describe ('music creation', function () {
      test ('should create new music', function () {
        return superagent.post ('http://localhost:3000/music')
        .set ('content-type', 'application/json')
        .send ( {
          name : 'piano',
          genre : 'jazz',
        })
        .then (res => {
          let text = JSON.parse (res.text);
          musicID = text.id;
          expect (res.status).toEqual (200);
          expect (text.name).toEqual ('piano');
          expect (text.genre).toEqual ('jazz');
          expect (text.id).not.toBe (null);
        });
      });
  });


  describe ('music request', function () {
    test ('should retain music by id', function () {
      return superagent.get ('http://localhost:3000/music')
      .then (res => {
        let text = JSON.parse (res.text);
        expect (res.status).toBe (200);
        expect (text.name).toEqual ('piano');
        expect (text.id).toEqual (musicID);
      });
    });


    test ('should return array', function () {
      return superagent.get ('http://localhost:3000/music')
      .then (res => {
        let text = JSON.parse (res.text);
        expect (res.status).toBe (200);
        expect (Array.toBeArray ([text])).toBe (true);
      });
    });


    test ('should call 404 for error id', function () {
      return superagent.get ('http://localhost:3000/2')
      .then (Promise.reject)
      .catch (res => {
        expect (res.status).toBe (404);
      });
    });
  });


  describe ('music deletion', function () {
    test ('should respond with 200 when id deleted', function () {
      return superagent.delete ('http://localhost:3000/music')
      .then (res => {
        expect (res.status).toBe (200);
      });
    });


    test ('music should be empty', function () {
      return superagent.get ('http://localhost:3000/music')
      .then (res => {
        expect (res.text).toBe (' ');
      });
    });
  });


  test ('shoud respond 400 error no id', function () {
    return superagent.delete ('http://localhost:3000/music')
    .then (Promise.reject)
    .catch (res => {
      expect (res.status).toBe (404);
    });
  });


  describe ('genre deletion', function () {
    test ('should respond 200 when deleting genre id', function () {
      return superagent.delete ('http://localhost:3000/genre')
      .then (res => {
        expect (res.status).toBe (200);
      });
    });


    test ('should be empty genre', function () {
      return superagent.get ('http://localhost:3000/genre')
      .then (res => {
        expect (res.text).toBe (' ');
      });
    });


    test ('should respond 400 error no id', function () {
      return superagent.delete ('http://localhost:3000/genre')
      .then (Promise.reject)
      .catch (res => {
        expect (res.status).toBe (400);
      });
    });


    test ('should respond 400 error id', function () {
      return superagent.delete ('http://localhost:3000/genre/2')
      .then (Promise.reject)
      .catch (res => {
        expect (res.status).toBe (404);
      });
    });
  });
});
}
