import React, { PureComponent } from 'react';
import {
  View,
  SegmentedControlIOS,
  Platform,
  Picker
} from 'react-native';
import { connect } from 'react-redux';

import { CHANGE_SORT } from '../constants/actionTypes';

class LibraryListSortFilter extends PureComponent {
  render() {
    const { changeSortOrder, sortIndex } = this.props;

    if (Platform.OS === 'ios') {
      return (
        <View>
          <SegmentedControlIOS
            values={['Alphabetical', 'Distance', 'Type']}
            selectedIndex={sortIndex}
            onChange={(event) => {
              changeSortOrder(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
      );
    }
    // if (Platform.OS === 'android') {}
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sortIndex } = state.trailState;
  return {
    ...ownProps,
    sortIndex
  };
};

const mapDispatchToProps = dispatch => ({
  changeSortOrder: sortIndex => dispatch({ type: CHANGE_SORT, payload: sortIndex }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryListSortFilter);
