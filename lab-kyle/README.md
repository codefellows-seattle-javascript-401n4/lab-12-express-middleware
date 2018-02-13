You will need a .env with a PORT  or you can just use Port 3000.

start by running npm run start

open a new command line

POST command: http POST :3000/api/doggo name=" " breed=" "

GET one command: http GET :3000/api/doggo/<ID>

GET all command: http GET :3000/api/doggo

PUT command: http PUT :3000/api/doggo/<ID> name="changed name" breed="changed breed"

DELETE command: http DELETE :3000/api/doggo/<ID>
