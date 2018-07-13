#### Test
* npm test (jest)



#### Feature Tasks
* create a single resource `express` API that can handle **GET**, **POST**, and **PUT** requests
* use the `http-errors` module to create new errors and associate them with a proper status code
* create an `error-middleware` module to handle errors and *use* it in your server file
* create a `cors-middleware` module that will allow for public use of your API
* create the `deleteItem` and `availIDs` methods and add them to your `storage` module
  * these methods should be used to delete a resource (`deleteItem`) and return an array of id's from persisted resource filenames (`availIDs`)
* create the `updateNote`, `fetchNote`, and `fetchIDs` static methods as part of your `Note` model
* create a series of `note-route-tests` to test your **GET**, **POST**, and **PUT** routes
  
