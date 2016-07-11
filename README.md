# ipod

# Setup mongo server
`mkdir ~/mongodb
mkdir ~/mongodb/data
mkdir ~/mongodb/data/db
sudo mongod --dbpath ~/mongodb/data/db`


# to get in the mongo console
`mongo
use ipod
db.users.find()
...`

# Start the app
`nodemon index.js (cuz i like nodemon. i know people are very opinionated with this :D)`