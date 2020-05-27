# Ethereum Lottery

This react app communicates with a lottery contract on the ethereum blockchain. It allows players to start a new lottery, enter for a chance to win and select a winner.

The app is currently being hosted [here][app_url].

## Setup
1. Install metamask chrome extension by visiting https://metamask.io/.
1. Install yarn
   ```
   npm install -g yarn
   ```
1. Install the node dependencies
   ```
   yarn
   ```
1. (optional) Install firebase
   ```
   yarn global add firebase-tools

## Development
1. Start the development server.
   ```
   yarn start
   ```
1. Open [http://localhost:3000][local_url] to view it in the browser.

## Testing
1. Start interactive prompt
   ```
   yarn test
   ```

## Deployments
1. Create a new build
   ```
   yarn build
   ```
1. Follow the instructions [here][firebase_instructions] to create the deployment configurations.
1. To deploy the application
   ```
   yarn deploy
   ```


### Useful links
* [React documentation](https://reactjs.org/)
* [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
* [React Testing](https://facebook.github.io/create-react-app/docs/running-tests)
* [General Deployments](https://facebook.github.io/create-react-app/docs/deployment)
* [Using Typescript with React](https://create-react-app.dev/docs/adding-typescript)
* [Deploying to Firebase](https://create-react-app.dev/docs/deployment/#firebase)

[firebase_instructions]: https://create-react-app.dev/docs/deployment/#firebase
[local_url]: http://localhost:3000
[app_url]: https://ethereum-lottery-7fb7b.web.app/
