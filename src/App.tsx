import React from 'react';
import './App.css';
import loadWeb3 from './web3';
import createContract from './lottery.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { isArray } from 'util';

class App extends React.Component<any, any> {
  state = { manager: '', players: [], balance: '', value: '', message: '' };
  web3?: Web3;
  lottery?: Contract;

  async componentDidMount() {
    this.lottery = await createContract();
    const manager = await this.lottery.methods.manager().call();
    const players = await this.lottery.methods.getPlayers().call();

    this.web3 = await loadWeb3();
    const balance = await this.web3.eth.getBalance(this.lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const accounts = await this.web3?.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await this.lottery?.methods.pickWinner().send()
  }

  onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accounts = await this.web3?.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    if (isArray(accounts) && accounts.length > 0) {
      await this.lottery?.methods.enter().send({
        from: accounts[0],
        value: this.web3?.utils.toWei(this.state.value, 'ether')
      });
    }

    this.setState({ 'message': 'You have been entered!' });
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

        <form onSubmit={this.onSubmit}>
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

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
