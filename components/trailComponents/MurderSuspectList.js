import React, { PureComponent } from 'react';
import { ScrollView, FlatList } from 'react-native';

import MurderSuspectListItem from './MurderSuspectListItem';

export default class MurderSuspectList extends PureComponent {
  keyExtractor = (item) => {
    const { answers, listType } = this.props;
    const index = answers[listType].findIndex(answer => answer.answer === item.answer);
    return index.toString();
  };

  onPressItem = (type, index) => {
    const { toggleSelected } = this.props;
    toggleSelected(type, index);
  }

  renderItem = ({ item }) => {
    const { answers, listType } = this.props;
    const index = answers[listType].findIndex(answer => answer.answer === item.answer);
    return (
      <MurderSuspectListItem
        id={index}
        onPressItem={this.onPressItem}
        title={item.answer}
        image={item.image}
        listType={listType}
      />
    );
  };

  render() {
    const {
      listType,
      answers
    } = this.props;

    const chooseData = () => {
      if (listType === 'suspects') {
        const data = answers.suspects;
        return data;
      }
      const data = answers.weapons;
      return data;
    };

    return (
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={chooseData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={Styles.MurderList}
          numColumns="3"
        />
      </ScrollView>
    );
  }
}

const Styles = {
  MurderList: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1
  }
};
