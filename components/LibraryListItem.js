import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colours from '../constants/colours';

export default class LibraryListItem extends React.PureComponent {
  onPress = () => {
    const { id, onPressItem } = this.props;
    onPressItem(id);
  };

  chooseStyle = () => {
    const { type } = this.props;
    switch (type) {
      case 'murder': return { backgroundColor: 'lightgray' };
      case 'spy': return { backgroundColor: colours.spyGreen };
      case 'treasure': return { backgroundColor: colours.treasureRed };
      default: return undefined;
    }
  }

  renderType = () => {
    const { sortType, type } = this.props;
    if (!sortType) {
      return (
        <Text style={Styles.Type}>
          { type }
        </Text>
      );
    }

    return (null);
  }

  render() {
    const { title, distance } = this.props;
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={this.onPress}>
        <View style={[Styles.Container, this.chooseStyle()]}>
          <View style={Styles.Left}>
            <Text style={Styles.Title} numberOfLines={1}>
              { title }
            </Text>
            {this.renderType()}
          </View>
          <View style={Styles.Right}>
            <Text style={Styles.Distance}>
              {`${distance}km`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const Styles = {
  Container: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    margin: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  Left: {
    flex: 5,
    flexDirection: 'column'
  },
  Right: {
    flex: 1,
    flexDirection: 'column'
  },
  Title: {
    overflow: 'hidden',
    fontSize: 18,
    flex: 2,
  },
  Type: {
    fontSize: 14,
    color: 'dimgray',
    flex: 1,
  },
  Distance: {
    textAlign: 'right',
  }
};
