import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DisplayTransactions.css';

class DisplayTransactions extends Component {
  render() {
    return (
      <div className="display-transactions">
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

export default connect(
  state => { return { transactions: state.customers[state.selectedCustomer].transactions } }
)(DisplayTransactions);
