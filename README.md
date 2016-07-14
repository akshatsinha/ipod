# ipod

## Setup mongo server
`mkdir ~/mongodb` <br/>
`mkdir ~/mongodb/data ` <br/>
`mkdir ~/mongodb/data/db` <br/> 
`sudo mongod --dbpath ~/mongodb/data/db`<br/>


## to get in the mongo console
`mongo` <br/>
`use ipod` <br/>
`db.users.find()` <br/>
`...` <br/>

## Start the app
`nodemon index.js (cuz i like nodemon. i know people are very opinionated with this :D)`
