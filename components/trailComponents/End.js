import React, { PureComponent } from 'react';
import { View } from 'react-native';

import SpyDecode from './SpyDecode';

export default class End extends PureComponent {
  renderFinale = () => {
    const {
      theme,
      trailSave,
      currentTrail,
      spyToggleSelected
    } = this.props;
    switch (theme) {
      case 'spy': return <SpyDecode trailSave={trailSave} currentTrail={currentTrail} toggleSelected={spyToggleSelected} />;
      default: return null;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderFinale()}
      </View>
    );
  }
}
