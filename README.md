# Express-React-Project

How to set up a project with Node Backend and React Frontend and then setting up an Express backend API, and then displaying the data from the backend API onto the frontend using React.

## Set up Server Configuration

### STEP #1

We need to create our directories for both the `client` and the `server` in your root directory

```
// VS Code
client
server
// or terminal
mkdir client
mkdir server
```

### Next set up our project files

We will set up our server first and generate a `package.json` file

```
cd server
npm init -y
```

Then go into the `package.json` file and lets change where this will point to. Default will name this `index.js`, but we will rename it to stay relative to what we are setting up.

```
"main": server.js
```

### Next we will create a server.js file

Then we will create a new file called `server.js` in the `server root directory`.

```
// VS Code
server.js

// or terminal
touch server.js
```

### Next, we need to install `express`

```
npm i express
// or
yarn add express
```

### Then, we will install `nodemon` in the dev dependency `(-D)`

```
npm i nodemon -D
// or
yarn add nodemon -D
```

### Let's add some scripts

Let's go back into the `package.json` file and add some scripts to start up our servers.

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server",
    "dev": "nodemon server"
  },
```

## Now, let's set up our Client Configuration

We need to change out of our current directory and go into our client directory

```
cd ...
cd client
```

### STEP #1

Let's create our React project in the client directory

```
npx create-react-app .
// or
npm init react-app .
// or
yarn create react-app .
```

### STEP #2

In the App.js, let's remove the default by deleting everyting in that file and create a new component.

```
// if you type `rafce` if will generate the component

import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App

```

## Set up Backend API in our Server

Ok, now that we have that set up, lets head back to `server.js`
For Help, please look at the server.js file for final version.

### STEP #1

- First we need to `import express` in to our `server.js`
- Then to setup our app we need to attach that to express

```
const express = require('express')
const app = express()
```

- Then we need to set up our `route` for the `api`
- `res.json` is our backend api. This case we are creating an `array` of `users`.
- Note: `users:` This is what the front end will fetch for the users array that will display all the users.

```
// Routes
app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree', 'userFour'] })
})
```

- Then in order to start up our backend

```
// port: note, this can be 8080, 5000, 5500, etc.

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on Port: ${port}`))

// or

app.listen(5000, () => {
  console.log('Server started on port 5000')
})

```

### STEP #2 - Start up Server

```
npm run dev
// or
yarn run dev
```

# Cors

### Note: If you want to set up Cors, please follow the next steps. If not, please skip.

## Handling CORS in Express Backend

Handling CORS is simple enough in JavaScript. The folks who built Express.js (JavaScript backend framework) have also written a node package to enable CORS with different options. Let’s do it in steps to make things easier:

### STEP #1

I am hoping you have a `Node.js and Express.js` backend set up. Open the terminal and type in the following command. Once you have done, press Enter.

```
npm install cors
yarn add cors

```

This command will download and install cors package in your project. You can open the package.json file to see cors in the dependency object.

### STEP #2

Now open your server’s entry point file and import cors at the top. Here is how you can do it:

```
// es6 syntax
import cors from ‘cors’;

//commonjs syntax
const cors = require(‘cors’);

```

### STEP #3

CORS is handled in your backend’s middlewares. So if you want to allow all CORS requests to your backend, you can do this using the following code snippet:

```
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

```

If you want your backend to be accessed via a single origin, you can do the following:

```
const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
	origin: 'http://example.com',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

```

The backend will only be accessible by the origin URL defined in the corsOptions object.

## Wrap Up Cors

This was a brief introduction to handling CORS in your server. I hope you now know why your cross-origin requests fail and how to fix them.

## Display data (users) on Front End.

Note: Please look at file for final version.
Now, lets head back to the `client` directory and open up our `App.js`. But before we do that we need to set up our `proxy`.

### STEP #1

Open up `package.json` and add `proxy`.

```
{
  "name": "client",
  "version": "0.1.0",
  "proxy": "http://localhost:5000",

```

### STEP #2

In `App.js` import `useEffect` and `useState` hooks

```
import React, { useEffect, useState } from 'react'
```

### STEP #3

Next, Let's create a state variable which will contain the backend data that we get from the backend `API`.

```
 const [backendData, setBackendData] = useState([{}])
  // console.log(backendData)
```

### STEP #4

Next we are going to fetch this `API`

```
 useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setBackendData(data)
      })
  }, []) // only run on the first render of component.
```

### STEP #5

Then lets return / display the array of data (users)

```
return (
    <div>
      {typeof backendData.users === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  )
```

### STEP #5

Let's start up our front end.

```
npm start
// or
yarn start
```

Note: to see that the api successfully fetch, open of the network tab and you can see that the api was successfully fetch with a 200 status.
