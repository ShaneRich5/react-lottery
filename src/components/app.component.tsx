import React from 'react';
import './app.css';
import loadWeb3 from '../services/web3.service';
import createContract from '../services/lottery.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { isArray } from 'util';
import { UnsupportedBrowserError } from '../errors/unsupported-browser.error';
import { ErrorModal } from './error-modal.component';
import { UserDeniedAccessError } from '../errors/user-denied-access.error';

type AppState = {
  manager: string,
  message: string,
  players: string[],
  balance: string | number,
  value: string | number,
  showModal: boolean,
  modalTitle: string,
};

class App extends React.Component<{}, AppState> {
  state = {
    players: [],
    manager: '',
    balance: '',
    value: '',
    message: '',
    showModal: false,
    modalTitle: '',
  };
  web3?: Web3;
  lottery?: Contract;

  async componentDidMount() {
    this.initializeLottery();
  }

  initializeLottery = async () => {
    this.setState({ showModal: false });

    console.log('initializing')

    try {
      this.web3 = await loadWeb3();
      this.lottery = await createContract();

      const manager = await this.lottery.methods.manager().call();
      const players = await this.lottery.methods.getPlayers().call();

      const balance = await this.web3.eth.getBalance(this.lottery.options.address);

      this.setState({ manager, players, balance, showModal: false });

    } catch (error) {
      if (error instanceof UnsupportedBrowserError) {
        this.setState({ showModal: true, modalTitle: 'Oops! Your browser is unsupported.' });
      } else if (error instanceof UserDeniedAccessError) {
        this.setState({ showModal: false, message: 'Authorization required.' });
      } else {
        this.setState({ showModal: false, message: 'Failed to start the lottery contract.' });
      }
    }
  }

  onClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const accounts = await this.web3?.eth.getAccounts();

    if (!isArray(accounts) || accounts.length <= 0) {
      this.setState({ showModal: true, modalTitle: 'Oops! Failed to retreive your account' });
      return;
    }

    this.setState({ message: 'Waiting on transaction success...' });

    await this.lottery!.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  }

  onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accounts = await this.web3?.eth.getAccounts();

    if (!isArray(accounts) || accounts.length <= 0) {
      this.setState({ showModal: false, message: 'Oops! Failed to retreive your account' });
      return;
    }

    this.setState({ message: 'Waiting on transaction success...' });

    await this.lottery!.methods.enter().send({
      from: accounts[0],
      value: this.web3!.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ 'message': 'You have been entered!' });
  }

  render() {
    return (
      <div>
        <ErrorModal
          shouldShow={this.state.showModal}
          title={this.state.modalTitle}
        ></ErrorModal>

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

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick aw winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
