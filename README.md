POST - /api/notes/  will return new note if valid JSON is sent (an Error is returned if no valid
JSON, title, or content is not sent)

GET - /api/notes/ will return all notes in db

GET - /api/notes/:id will return a with uniqure id, if a match is in db

DELETE - /api/notes/ Deletes the note with specified ID

http-errors module was created to associate errrors with a proper status code
error-middleware was added to handle errors use in _server file
cors-middleware module was added to allow for public use the API

To run Jest tests - npm test - in terminal