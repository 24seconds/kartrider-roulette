import React, { Component } from 'react';
import { IMAGE_URL } from '../../database/constant';

const defaultTheme = {
  "themeName": "",
  "themeOrder": -1
};

export default class TrackThemeItemComponent extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onSelectTheme, theme } = this.props;

    if (theme['themeName']) {
      onSelectTheme(theme);
    }
  }

  render() {
    const { theme = defaultTheme, isSelected } = this.props;

    return (
      <div className={ `kartrider-track-theme-item-component ${ isSelected ? 'selected' : '' }` }
        onClick={ this.onClick }>
        <img src={ `${IMAGE_URL}/theme/${theme['themeName']}.png` } alt='track theme icon'/>
        <p>{ theme['themeName'] }</p>
      </div>
    );
  }
}