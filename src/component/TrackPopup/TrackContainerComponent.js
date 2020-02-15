import React, { Component } from 'react';
import TrackThemeItemComponent from './TrackThemeItemComponent';
import TrackItemComponent from './TrackItemComponent';
import IndexedDbManager from '../../database/IndexedDbManager';

export default class TrackContainerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTheme: null,
      selectedTrackList: [],
    };

    this.onSelectTheme = this.onSelectTheme.bind(this);
  }

  async componentDidUpdate(_, prevState) {
    const { selectedTheme } = this.state;
    const { themeList } = this.props;

    if (selectedTheme === null && themeList.length > 0) {
      const selectedTheme = themeList[0];
      const selectedTrackList = await this.getTrackList(selectedTheme['themeName']);

      this.setState({
        selectedTheme,
        selectedTrackList
      });
    }
  }

  async getTrackList(theme) {
    const trackList = await IndexedDbManager.getTrackByTheme(theme);
    return trackList;
  }

  async onSelectTheme(theme) {
    const selectedTrackList = await this.getTrackList(theme['themeName']);
    this.setState({
      selectedTheme: theme,
      selectedTrackList
    });
  }

  render() {
    const { themeList } = this.props;
    const { selectedTheme, selectedTrackList } = this.state;

    return (
      <div className='kartrider-track-container-component'>
        <div className='track-theme-selector-container'>
          {
            themeList.map(theme => {
              return (
                <TrackThemeItemComponent
                  key={ theme['themeName'] }
                  theme={ theme }
                  isSelected={ selectedTheme && selectedTheme['themeName'] === theme['themeName'] }
                  onSelectTheme={ this.onSelectTheme } />
              )
            })
          }
        </div>
        <div className='track-item-container'>
          {
            selectedTrackList.map(track => {
              return (
                <TrackItemComponent
                  key={ track['trackName'] }
                  track={ track } />
              );
            })
          }
        </div>
      </div>
    );
  }
}