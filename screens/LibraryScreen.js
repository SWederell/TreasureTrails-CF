import React from 'react';
import {
  FlatList,
  SectionList,
  Text,
  // Button,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import LibraryListItem from '../components/LibraryListItem';
import LibraryListSortFilter from '../components/LibraryListSortFilter';
import { calculateDistance, dynamicSort, JSONtoArray } from '../assets/utilities';
import { CHANGE_SELECTED_TRAIL } from '../constants/actionTypes';

class LibraryScreen extends React.PureComponent {
  renderItem = ({ item }) => {
    const { sortIndex } = this.props;
    let sortType = false;
    if (sortIndex === 2) {
      sortType = true;
    }
    let type = '';
    switch (item.theme) {
      case 'murder': {
        type = 'Murder Mystery';
        break;
      }
      case 'spy': {
        type = 'Spy Mission';
        break;
      }
      case 'treasure': {
        type = 'Treasure Hunt';
        break;
      }
      default: { type = null; }
    }
    return (
      <LibraryListItem
        id={item.key}
        onPressItem={this.onPressItem}
        title={item.title}
        type={type}
        distance={item.distance}
        sortType={sortType}
      />
    );
  }

  onPressItem = (id) => {
    const { navigation, changeSelectedTrail } = this.props;
    changeSelectedTrail(id);
    navigation.navigate('TrailInfo');
  }

  keyExtractor = item => item.key;

  renderAlphaDistList(dataArray) {
    return (
      <FlatList
        data={dataArray}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={Styles.Library}
      />
    );
  }

  renderTypeList(dataArray) {
    return (
      <SectionList
        style={Styles.Library}
        renderItem={this.renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        )}
        sections={[
          { title: 'Murder Mystery', data: dataArray.filter(item => item.theme === 'murder') },
          { title: 'Spy Mission', data: dataArray.filter(item => item.theme === 'spy') },
          { title: 'Treasure Hunt', data: dataArray.filter(item => item.theme === 'treasure') },
        ]}
      />
    );
  }

  renderList() {
    const { metaList, sortIndex } = this.props;
    const data = JSONtoArray(metaList);
    const dataArray = data.map((item) => {
      const o = Object.assign({}, item);
      o.distance = calculateDistance(
        52.370841,
        -1.264024,
        item.map.lat,
        item.map.lon
      );
      return o;
    });

    dataArray.sort(dynamicSort('title'));

    switch (sortIndex) {
      case 2: {
        dataArray.sort(dynamicSort('theme'));
        return (this.renderTypeList(dataArray));
      }
      case 1: {
        dataArray.sort(dynamicSort('distance'));
        return (this.renderAlphaDistList(dataArray));
      }
      default: {
        return (this.renderAlphaDistList(dataArray));
      }
    }
  }

  render() {
    // const { state } = this.props;
    // console.log(state);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LibraryListSortFilter />
        {this.renderList()}

        {/* <Button onPress={() => console.log(state)} title="show state" /> */}

      </SafeAreaView>
    );
  }
}

const Styles = {
  Library: {
    flex: 1
  }
};

LibraryScreen.navigationOptions = {
  title: 'Library',
};

const mapStateToProps = (state, ownProps) => {
  const { metaList, sortIndex } = state.trailState;
  return {
    ...ownProps,
    metaList,
    sortIndex,
    state
  };
};

const mapDispatchToProps = dispatch => ({
  changeSelectedTrail: trail => dispatch({ type: CHANGE_SELECTED_TRAIL, payload: trail }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
