import React, { Component } from 'react';
import { IMAGE_URL } from '../database/constant';

export default class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.onClickId = this.onClickId.bind(this);
    this.onClickRepo = this.onClickRepo.bind(this);
  }

  onClickId() {
    window.open('https://github.com/24seconds/', '_blank');
  }

  onClickRepo() {
    window.open('https://github.com/24seconds/kartrider-roulette', '_blank');
  }

  render() {
    return (
      <div className='kartrider-footer'>
        <div onClick={ this.onClickId }>
          <img className='github-mark' src={ `${IMAGE_URL}/icon_github_mark.png` } alt="github icon" />
            24seconds
        </div>
        <div onClick={ this.onClickRepo }>
          <img className='github-mark' src={ `${IMAGE_URL}/icon_github_mark.png` } alt="github icon" />
          repo : kartrider-roulette
        </div>
      </div>
    );
  }
}