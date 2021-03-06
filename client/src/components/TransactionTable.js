import React from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import EditableTransaction from './EditableTransaction';
import * as actions from '../actions';
import {getTransactions} from '../selectors/transactions';
import {getCategoriesById} from '../selectors/categories';
import {getAccountsById} from '../selectors/accounts';
import {getSelectedTransactions} from '../selectors/ui';

class TransactionTable extends React.Component {
  static propTypes = {
    transactions: React.PropTypes.array.isRequired,
    categoriesById: React.PropTypes.object.isRequired,
    accountsById: React.PropTypes.object.isRequired,
    selectedTransactions: React.PropTypes.object.isRequired,
    selectTransaction: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Payee</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <EditableTransaction />
          { this.props.transactions.map(t =>
            <Transaction
              busy={t.busy}
              id={t.id}
              date={t.date}
              payee={t.payee}
              category={this.props.categoriesById[t.category_id] && this.props.categoriesById[t.category_id].name}
              description={t.description}
              amount={t.amount}
              transfer_account={t.transfer_account_id && this.props.accountsById[t.transfer_account_id].name}
              selected={this.props.selectedTransactions.has(t.id)}
              key={t.id}
              inflow_to_be_budgeted={t.inflow_to_be_budgeted}
              onClick={() => this.props.selectTransaction(t.id) }/>)
            }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoriesById: getCategoriesById(state),
    accountsById: getAccountsById(state),
    transactions: getTransactions(state),
    selectedTransactions: getSelectedTransactions(state)
  };
};

export default connect(mapStateToProps, actions)(TransactionTable);
