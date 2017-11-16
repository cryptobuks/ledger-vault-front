//@flow
import fiatUnits from "../fiat-units";
import type { Account, Currency, Unit, Rate } from "./types";

// This define utility to deal with currencies, units, countervalues

type UnitValue = { value: number, unit: Unit };

export function getAccountCurrencyUnit(account: Account): Unit {
  return (
    account.currency.units[account.settings.unitIndex] ||
    account.currency.units[0]
  );
}

export function getCurrency(
  currencies: Array<Currency>,
  currencyName: string
): Currency {
  const currency = currencies.find(c => c.name === currencyName);
  if (!currency) {
    throw new Error(`currency "${currencyName}" not found`);
  }
  return currency;
}

// calculate the counter value at a specific rate
export function countervalueForRate(rate: Rate, value: number): UnitValue {
  const unit = fiatUnits[rate.fiat];
  if (!unit) {
    throw new Error(`countervalue "${rate.fiat}" not found`);
  }
  return {
    value: Math.round(rate.value * value),
    unit
  };
}

const nonBreakableSpace = " ";

export function formatCurrencyUnit(
  unit: Unit,
  value: number,
  showCode: boolean,
  alwaysShowSign: boolean,
  showAllDigits: boolean
): string {
  console.log(unit);
  const { magnitude, code } = unit;
  const floatValue = value / 10 ** magnitude;
  const minimumFractionDigits = showAllDigits ? magnitude : 0;
  const maximumFractionDigits = Math.max(
    minimumFractionDigits,
    Math.max(
      0,
      // dynamic max number of digits based on the value itself. to only show significant part
      Math.min(4 - Math.round(Math.log10(Math.abs(floatValue))), magnitude)
    )
  );

  const format =
    (showCode ? code : "") +
    nonBreakableSpace +
    (alwaysShowSign && floatValue > 0 ? "+" : "") +
    floatValue.toLocaleString("en-EN", {
      maximumFractionDigits,
      minimumFractionDigits
    });
  return format;
}

// Infer the currency unit. works with fiat too.
export function inferUnit(
  currencies: Array<Currency>,
  currencyName: string
): Unit {
  // try to find a countervalues unit
  if (currencyName in fiatUnits) {
    return fiatUnits[currencyName];
  } else {
    // try to find a crypto currencies unit
    const currency = getCurrency(currencies, currencyName);
    if (currency) {
      // TODO: this will depend on user pref (if you select mBTC vs BTC , etc..)
      // we might have a redux store that store user prefered unit per currencyName
      const unit = currency.units[0];
      if (!unit) {
        throw new Error(`currency "${currencyName}" have no units`);
      }
      return unit;
    } else {
      throw new Error(`currency "${currencyName}" not found`);
    }
  }
}
