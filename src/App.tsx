import React from 'react';
import './App.css';
import loadWeb3 from './web3';
import createContract from './lottery.service';
import Web3 from 'web3';

class App extends React.Component<any, any> {
  state = { manager: '', players: [], balance: '', value: '' };
  web3?: Web3;

  async componentDidMount() {
    const lottery = await createContract();
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();

    this.web3 = await loadWeb3();
    const balance = await this.web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {this.web3?.utils.fromWei(this.state.balance)} ether!
        </p>
        <hr />

        <form>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
