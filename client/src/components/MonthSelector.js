'use strict';
import React from 'react';
import ui from 'redux-ui';
import Button from './Button';

@ui()
class MonthSelector extends React.Component {

  static propTypes = {
    ui: React.PropTypes.object.isRequired,
    updateUI: React.PropTypes.func.isRequired
  };

  previous() {
    const current_month = this.props.ui.month;
    if (current_month == 1) {
      this.props.updateUI({year: this.props.ui.year - 1, month: 12});
    } else {
      this.props.updateUI('month', current_month - 1);
    }
  }

  next() {
    const current_month = this.props.ui.month;
    if (current_month == 12) {
      this.props.updateUI({year: this.props.ui.year + 1, month: 1});
    } else {
      this.props.updateUI('month', current_month + 1);
    }
  }

  render() {
    return (
      <div className="btn-group" role="group">
        <Button onClick={::this.previous}>Previous</Button>
        <Button>{this.props.ui.month}-{this.props.ui.year}</Button>
        <Button onClick={::this.next}>Next</Button>
      </div>
    );
  }

}

export default MonthSelector;
