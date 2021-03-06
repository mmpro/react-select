import PropTypes from 'prop-types';
import React from 'react';

class MultiSelectValueList extends React.Component {

  constructor(props) {
    super(props);

    this.handleMouseDown      = this.handleMouseDown.bind(this);
    this.onRemove             = this.onRemove.bind(this);
    this.handleTouchEndRemove = this.handleTouchEndRemove.bind(this);
    this.handleTouchMove      = this.handleTouchMove.bind(this);
    this.handleTouchStart     = this.handleTouchStart.bind(this);
    this.handleTouchMove      = this.handleTouchMove.bind(this);
  }

  handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();

    if(event.type === 'mousedown' && event.button !== 0) {
      return;
    }

    if(this.props.onClick) {
      event.stopPropagation();
      this.props.onClick(this.props.value, event);
      return;
    }

    if(this.props.value.href) {
      event.stopPropagation();
    }
  }

  onRemove(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.value);
  }

  handleTouchEndRemove(event) {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if(this.dragging) {
      return;
    }

    // Fire the mouse events
    this.onRemove(event);
  }

  handleTouchMove(event) {
    // Set a flag that the view is being dragged
    this.dragging = true;
  }

  handleTouchStart(event) {
    // Set a flag that the view is not being dragged
    this.dragging = false;
  }

  renderRemoveIcon() {
    if(this.props.disabled || !this.props.onRemove) {
      return;
    }
    return (
      <span
        style={{ float: 'right' }}
        className="icon-cross3"
        aria-hidden="true"
        onMouseDown={this.onRemove}
        onTouchEnd={this.handleTouchEndRemove}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove} >
			</span >
    );
  }

  renderLabel() {
    return (
      <span style={{ width: '95%' }} >{this.props.children}</span >
    );
  }

  render() {
    return (
      <div
        className={'Select--multiItem ' + this.props.className}
        title={this.props.value.title} >
        {this.renderLabel()}
        {this.renderRemoveIcon()}
      </div >
    );
  }
}

MultiSelectValueList.propTypes = {
  children:  PropTypes.node,
  className: PropTypes.string,
  disabled:  PropTypes.bool,               // disabled prop passed to ReactSelect
  id:        PropTypes.string,                   // Unique id for the value - used for aria
  onClick:   PropTypes.func,                // method to handle click on value label
  onRemove:  PropTypes.func,               // method to handle removal of the value
  value:     PropTypes.object.isRequired     // the option object for this value
};

export default MultiSelectValueList;
