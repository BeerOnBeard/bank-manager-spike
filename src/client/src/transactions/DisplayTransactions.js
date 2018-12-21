import React, { Component } from 'react';
import { withdraw, deposit } from '../commandGateway';
import './DisplayTransactions.css';

class DisplayTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = { deposit: '', withdrawal: '', canDeposit: false, canWithdraw: false };
    this.depositChanged = this.depositChanged.bind(this);
    this.withdrawalChanged = this.withdrawalChanged.bind(this);
  }

  depositChanged(event) {
    this.setState({ ...this.state, deposit: event.target.value, canDeposit: event.target.checkValidity() });
  }

  withdrawalChanged(event) {
    this.setState({ ...this.state, withdrawal: event.target.value, canWithdraw: event.target.checkValidity() });
  }

  render() {
    return (
      <div className="display-transactions">
        <div className="display-transactions__control">
          <input type="number" min="1" value={this.state.deposit} onChange={this.depositChanged} required />
          <button disabled={!this.state.canDeposit} onClick={_ => deposit(this.props.customerId, this.state.deposit)}>Deposit</button>
        </div>
        <div className="display-transactions__control">
          <input type="number" min="1" value={this.state.withdrawal} onChange={this.withdrawalChanged} required />
          <button disabled={!this.state.canWithdraw} onClick={_ => withdraw(this.props.customerId, this.state.withdrawal)}>Withdraw</button>
        </div>
        <div className="display-transactions__scroll-container">
        {
          this.props.transactions.map(transaction => {
            return (
              <div className="display-transactions__transaction">
                {transaction.type}: {transaction.value}
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }
}

export default DisplayTransactions;
