import React from 'react';

export default class Link extends React.Component {
  render() {
    const { children, onClick } = this.props;
    return (
      <a href='#' onClick={
        e => {
          e.preventDefault();
          onClick();
        }} >{children}</a>
    );
  }
}

Link.propTypes = {
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func.isRequired
};
