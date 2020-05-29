import React from 'react';
import logo from './logo.svg';
import './App.css';
// import loadWeb3 from './web3';
import createContract from './lottery.service';

class App extends React.Component {
  async componentDidMount() {
    // const lottery = await createContract().then();
    // const manager = await lottery.methods.manager().call();
    // console.log(manager);

    const lottery = await createContract();
    const manager = await lottery.methods.manager().call();

    // .then(console.log);
    // .then(lottery => lottery.methods.manager().call())
    // .then(console.log);
    // const manager = await lottery.methods.manager().call();
    console.log(manager);

    console.log('hi')
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
