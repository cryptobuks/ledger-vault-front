//@flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import DateFormat from '../../components/DateFormat';
import CurrencyNameValue from '../../components/CurrencyNameValue';
import AccountName from '../../components/AccountName';
import LastOperationTable from '../../components/LastOperationTable';
import type { Operation, Account } from '../../datatypes';

class LastOperationCard extends Component<*> {
  props: {
    operations: Array<Operation>,
    accounts: Array<Account>
  };
  render() {
    const { operations, accounts } = this.props;
    return (
      <Card
        title="last operations"
        titleRight={<Link to="TODO">VIEW ALL</Link>}
      >
        <LastOperationTable operations={operations} accounts={accounts} />
      </Card>
    );
  }
}

export default LastOperationCard;
