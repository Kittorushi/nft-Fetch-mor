# Getting Started with React App


## Available Scripts

In the project directory, you can run:

## `cd ap`
## `npm install`
----------------------------
## `cd api`
## `npm install`
-----------------------

starting server

### `cd ap`
### `npm start`

Open new terminal

## `cd api`
## `npm start`




Runs the app in the development mode.\
Open [http://localhost:3000] and (http://localhost:3001) to view it in your browser.


### Advanced Configuration

get api key from moralis
# https://admin.moralis.io/web3apis

add your api in 
api/index.js file

Moralis.start({
##  apiKey: "Add your key here",
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
