import Web3 from 'web3';
import React from 'react';
import { isArray } from 'util';
import { Contract } from 'web3-eth-contract';
import Container from 'react-bootstrap/Container';
import loadWeb3 from '../../services/web3.service';
import createContract from '../../services/lottery.service';
import { UserDeniedAccessError } from '../../errors/user-denied-access.error';
import { UnsupportedBrowserError } from '../../errors/unsupported-browser.error';
import { ERROR_MESSAGE, PENDING_MESSAGE, SUCCESS_MESSAGE, EMPTY_MESSAGE } from './app.constants';
import './app.css';

type AppState = {
  manager: string,
  message: string,
  players: string[],
  balance: string | number,
  value: string | number,
};

class App extends React.Component<{}, AppState> {
  state = {
    players: [],
    manager: '',
    balance: '',
    value: '',
    message: '',
  };
  web3?: Web3;
  lottery?: Contract;

  async componentDidMount() {
    this.initializeLottery();
  }

  loadContract = async () => {
    this.web3 = await loadWeb3();
    this.lottery = await createContract();

    const manager = await this.lottery.methods.manager().call();
    const players = await this.lottery.methods.getPlayers().call();

    const balance = await this.web3.eth.getBalance(this.lottery.options.address);

    this.setState({ manager, players, balance });
  }

  initializeLottery = async () => {
    try {
      this.setState({ message: PENDING_MESSAGE.LOADING_LOTTERY_CONTRACT });
      await this.loadContract();
      this.setState({ message: EMPTY_MESSAGE });
    } catch (error) {
      if (error instanceof UnsupportedBrowserError) {
        this.setState({ message: ERROR_MESSAGE.UNSUPPORTED_BROWSER });
      } else if (error instanceof UserDeniedAccessError) {
        this.setState({ message: ERROR_MESSAGE.ACCESS_NOT_GRANTED });
      } else {
        this.setState({ message: ERROR_MESSAGE.CONTRACT_INITIAILIZATION });
      }
    }
  }

  onClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const accounts = await this.web3?.eth.getAccounts();

    if (!isArray(accounts) || accounts.length <= 0) {
      this.setState({ message: ERROR_MESSAGE.ACCOUNT_INITIALIZATION });
      return;
    }

    this.setState({ message: PENDING_MESSAGE.TRANSACTION });

    await this.lottery!.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: SUCCESS_MESSAGE.WINNER_PICKED });
  }

  onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accounts = await this.web3?.eth.getAccounts();

    if (!isArray(accounts) || accounts.length <= 0) {
      this.setState({ message: ERROR_MESSAGE.ACCOUNT_INITIALIZATION });
      return;
    }

    this.setState({ message: PENDING_MESSAGE.TRANSACTION });

    try {
      await this.lottery!.methods.enter().send({
        from: accounts[0],
        value: this.web3!.utils.toWei(this.state.value, 'ether')
      });

      this.setState({ 'message': SUCCESS_MESSAGE.PLAYER_ENTERED });
    } catch {
      this.setState({ 'message': ERROR_MESSAGE.TRANSACTION_FAILED });
    }
  }

  render() {
    return (
      <Container className="App">
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

          <h4>Ready to pick a winner?</h4>
          <button onClick={this.onClick}>Pick a winner!</button>

          <hr />

          <h1>{this.state.message}</h1>
        </div>
      </Container>
    );
  }
}

export default App;
