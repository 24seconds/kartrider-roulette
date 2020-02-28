import React, { Component } from 'react';
import TrackThemeItemComponent from './TrackThemeItemComponent';
import TrackItemComponent from './TrackItemComponent';

export default class TrackContainerComponent extends Component {
  constructor(props) {
    super(props);

    this.onSelectTheme = this.onSelectTheme.bind(this);
    this.containerRef = React.createRef();
  }

  onSelectTheme(theme) {
    const { onSelectTheme } = this.props;
    this.scrollToRef();

    if (onSelectTheme) {
      onSelectTheme(theme);
    }
  }

  scrollToRef() {
    this.containerRef.current.scrollTo(0, 0);
  }

  render() {
    const {
      themeList,
      selectedTheme,
      selectedTrackList,
      collectionTrackSet,
      onSelectTrack,
    } = this.props;

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
        <div className='track-item-container' ref={ this.containerRef }>
          {
            selectedTrackList.map(track => {
              return (
                <TrackItemComponent
                  key={ track['trackName'] }
                  track={ track }
                  isSelected={  collectionTrackSet.has(track['trackName']) }
                  onSelectTrack={ onSelectTrack } />
              );
            })
          }
        </div>
      </div>
    );
  }
}