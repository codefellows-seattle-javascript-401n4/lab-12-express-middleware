*lib/_server.js*  Defines routes for the note model.

_GET /api/notes/_ Returns all notes

_GET /api/notes/:id_  REturns a specific note, if matches ID

      -Returns a 404 if invalid ID is given

_POST /api/notes/_ Returns resource for valid body-parser

      -REturns a 400 if no body is provided

_PUT /api/notes/_ Returns a 200 with success message if valid id is provided.

      -Returns a 404 if invalid ID is given
      -REturns a 400 if no ID or no content is given

_PATCH /api/notes/_ Returns a 200 with success message if valid id is provided.

      -Returns a 404 if invalid ID is given
      -REturns a 400 if no ID or no content is given

_DELETE /api/notes/_  Deletes note if provided ID is a matches

      -Otherwise returns a 500 server error

*models/note* Note class constructor.

  _updateNote(id, body)_  takes in an ID (string) and response body and returns an updated Note.

  _fetchNote(id)_  takes in an ID (string) and returns the matching note

  _fetchIDs()_  returns all IDs from the notes in notes.json

  *lib/error-middleware*
    returns the response body, status code and message (uses http-errors) and is called from final app.use() when an error is thrown

*lib/storage*   

   Is instantiated with a notes.json db file from server.js as well as note.js.

   _getAllNotes()_ reads notes.json file and returns array of notes

   _saveNote(note)_ takes in response body and saves a note to file

   _deleteItem(id)_ takes in an id (string) and deletes the matching note from file.


*__test__* use `npm test` to run
