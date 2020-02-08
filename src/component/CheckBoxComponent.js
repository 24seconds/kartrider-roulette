import React, { Component }  from 'react';

export default class CheckBoxComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }


  render() {
    const { isChecked } = this.state;

    return (
      <div className='kartrider-checkbox-component' onClick={ this.onClick }>
        <div className={ isChecked ? 'check-mark' : null }></div>
      </div>
    );
  }
}