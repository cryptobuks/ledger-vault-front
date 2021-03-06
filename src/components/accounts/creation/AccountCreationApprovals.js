import React from 'react';
import PropTypes from 'prop-types';
import { DialogButton } from '../../';

function AccountCreationApprovals(props) {
  const { switchInternalModal, approvals, setApprovals, members } = props;
  return (
    <div className="small-modal">
      <header>
        <h3>Approvals</h3>
      </header>
      <div className="content">
        <div className="form-field">
          <input
            type="text"
            id="approval-field"
            value={approvals}
            onChange={e => setApprovals(e.target.value)}
          />
          <label htmlFor="approval-field">Amount</label>
          <span className="count">approvals from {members.length} members</span>
        </div>
        <p className="info">
          Approvals define the number of required signatures from the group
          of members allowed to approve outgoing operations.
        </p>
      </div>

      <div className="footer">
        <DialogButton right highlight onTouchTap={() => switchInternalModal('main')}>Done</DialogButton>
      </div>
    </div>
  );
}

AccountCreationApprovals.propTypes = {
  approvals: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  switchInternalModal: PropTypes.func.isRequired,
  setApprovals: PropTypes.func.isRequired,
};

export default AccountCreationApprovals;
