POST to the api /sushi
will create a schema and keep it databased in mongodb.
A request sent without a name will return a 400 error.

GET to the api /sushi
will show all the databased users.
A request sent with an empty database will return a 404 error.

GET to the api /sushi/:id
will show the specific user associated with that id.
A request sent with an invalid id will return a 400 error.

PUT to the api /sushi/:id
will update the name in the associated user with that id.
A request made with an invalid id will return a 400 error. 
