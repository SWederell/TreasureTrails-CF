import React from 'react';
import { Text, Button, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import TrailInfoMetaIcons from '../components/TrailInfoMetaIcons';
import { INITIALISE_TRAIL_SAVE } from '../constants/actionTypes';

class TrailInfoScreen extends React.PureComponent {
  renderTrailButtonText = () => {
    const { cont } = this.props;
    if (cont) {
      return 'Continue Trail';
    }
    return 'Start Trail';
  }

  render() {
    const {
      navigation,
      trail,
      initialiseTrailSave,
      // state
    } = this.props;
    const versionDate = new Date(JSON.parse(trail.versionHistory.latestRelease));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const versionDateString = `${versionDate.getDate()} ${months[versionDate.getMonth()]} ${versionDate.getFullYear()}`;

    return (
      <SafeAreaView>
        <View style={Styles.container}>
          <Text style={Styles.trailTitle}>{trail.title}</Text>
          <Text style={Styles.legendTitle}>{trail.legend_title}</Text>
          <Text style={Styles.legend}>{trail.legend}</Text>
          <TrailInfoMetaIcons trail={trail} />
          <Text>{`Version date: ${versionDateString}`}</Text>
          <Button
            onPress={() => {
              initialiseTrailSave();
              navigation.navigate('Trail');
            }}
            title={this.renderTrailButtonText()}
          />

          {/* <Button onPress={() => console.log(state)} title="show state" /> */}
        </View>
      </SafeAreaView>
    );
  }
}

TrailInfoScreen.navigationOptions = () => ({
  title: 'Trail Info',
});

const Styles = {
  trailTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  container: {
    marginRight: 10,
    marginLeft: 10
  },
  legendTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  legend: {
    marginLeft: 10,
    marginRight: 10
  }
};

const mapStateToProps = (state, ownProps) => {
  const { trailState } = state;
  const { selectedTrail, metaList, save } = trailState;
  const cont = (selectedTrail in save);
  return {
    ...ownProps,
    trail: metaList[selectedTrail],
    cont
  };
};

const mapDispatchToProps = dispatch => ({
  initialiseTrailSave: () => dispatch({ type: INITIALISE_TRAIL_SAVE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailInfoScreen);
