//@flow
import React, { Component } from "react";
import connectData from "../../restlay/connectData";
import * as api from "../../data/api-spec";
import CurrencyNameValue from "../../components/CurrencyNameValue";
import { TotalBalanceFilters } from "../../components/TotalBalanceFilter";
import DateFormat from "../../components/DateFormat";
import Card from "../../components/Card";
import CardField from "../../components/CardField";
import EvolutionSince from "./EvolutionSince";
import "./TotalBalanceCard.css";
import CustomSelectField from "../../components/CustomSelectField/CustomSelectField.js";

class TotalBalance extends Component<{
  totalBalance: *,
  filter: *,
  onTotalBalanceFilterChange: (value: *) => void,
  reloading: boolean
}> {
  render() {
    const {
      onTotalBalanceFilterChange,
      filter,
      totalBalance,
      reloading
    } = this.props;
    return (
      <Card
        reloading={reloading}
        className="total-balance"
        title="total balance"
        titleRight={
          <CustomSelectField
            values={TotalBalanceFilters}
            selected={filter}
            onChange={onTotalBalanceFilterChange}
          />
        }
      >
        <div className="body">
          <CardField label={<DateFormat date={totalBalance.date} />}>
            <CurrencyNameValue
              currencyName={totalBalance.currencyName}
              value={totalBalance.value}
            />
          </CardField>
          <EvolutionSince
            value={totalBalance.value}
            valueHistory={totalBalance.valueHistory}
            filter={filter}
          />
          <CardField label="accounts" align="right">
            {totalBalance.accountsCount}
          </CardField>
          <CardField label="currencies" align="right">
            {totalBalance.currenciesCount}
          </CardField>
          <CardField label="members" align="right">
            {totalBalance.membersCount}
          </CardField>
        </div>
      </Card>
    );
  }
}

class RenderError extends Component<*> {
  render() {
    return <Card className="total-balance" title="total balance" />;
  }
}

class RenderLoading extends Component<*> {
  render() {
    return <Card className="total-balance" title="total balance" />;
  }
}

export default connectData(TotalBalance, {
  queries: {
    totalBalance: api.dashboardTotalBalance
  },
  optimisticRendering: true,
  RenderError,
  RenderLoading
});
