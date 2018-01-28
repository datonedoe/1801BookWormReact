import React from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPage = ({ isConfirmed }) => (
    <div>
    {!isConfirmed && <ConfirmEmailMessage/>}
    </div>
)

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  console.log("React | pages/DashboardPage | mapStateToProps state", state)
  return {
    isConfirmed: state.user.confirmed
  }
}
export default connect(mapStateToProps, null)(DashboardPage);
