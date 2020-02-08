import React, { Component } from 'react';
import { IMAGE_URL } from '../../redux/store';

export default class CollectionDetailItemComponent extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  componentDidMount() {
    // fetch detail track list of selected collection here
  }

  onClick() {
    this.props.onClick(false);
  }

  onBack() {

  }

  render() {
    return (
      <div className='kartrider-collection-detail-item-component' onClick={ this.onClick }>
        <h3 className='collection-detail-title' >
          <div>
            선택된 트랙
          </div>
          <button className='collection-detail-back' onClick={ this.onBack } >
            <img src={ `${IMAGE_URL}/icon_back.png` } alt="back to collection list icon" />
          </button>
        </h3>
        <div className='collection-detail-track-container'>
          <div className='collection-detail-track'>
            <img src={ `${IMAGE_URL}/abyss.png` } alt="track icon" />
            <div>
              차이나 서안 병마용
            </div>
            <button className='collection-detail-delete' onClick={ this.onDeleteItem }>
              <img src={ `${IMAGE_URL}/icon_delete.svg` } alt="delete icon" />
            </button>
          </div>
          <div className='collection-detail-track'>
            <img src={ `${IMAGE_URL}/abyss.png` } alt="track icon" />
            <div>
              아이스 갈라진 빙산
            </div>
            <button className='collection-detail-delete' onClick={ this.onDeleteItem }>
              <img src={ `${IMAGE_URL}/icon_delete.svg` } alt="delete icon" />
            </button>
          </div>
          <div className='collection-detail-track'>
            <img src={ `${IMAGE_URL}/abyss.png` } alt="track icon" />
            <div>
              사막 빙글빙글 공사장
            </div>
            <button className='collection-detail-delete' onClick={ this.onDeleteItem }>
              <img src={ `${IMAGE_URL}/icon_delete.svg` } alt="delete icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}