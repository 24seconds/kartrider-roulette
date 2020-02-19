import React, { Component }  from 'react';

export default class CheckBoxComponent extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onClick, isChecked } = this.props;

    if (onClick) {
      onClick(!isChecked);
    }
  }


  render() {
    const { isChecked } = this.props;

    return (
      <div className='kartrider-checkbox-component' onClick={ this.onClick }>
        <div className={ isChecked ? 'check-mark' : null }></div>
      </div>
    );
  }
}