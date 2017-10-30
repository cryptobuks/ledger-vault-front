import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

/*
to be specified..
*/
export const TotalBalanceFilters = {
  yesterday: { title: "yesterday" },
  week: { title: "a week ago" },
  month: { title: "a month ago" }
};

class TotalBalanceFilter extends Component {
  onChange = (event, index, value) => this.props.onChange(value);
  render() {
    const { value } = this.props;
    return (
      // FIXME this is not pixel perfect with wireframes.
      // we need to see how to make material-ui match that.
      <SelectField
        value={value}
        onChange={this.onChange}
        style={{ width: 150 }}
      >
        {Object.keys(TotalBalanceFilters).map(id => (
          <MenuItem
            key={id}
            value={id}
            primaryText={TotalBalanceFilters[id].title}
          />
        ))}
      </SelectField>
    );
  }
}

export default TotalBalanceFilter;
