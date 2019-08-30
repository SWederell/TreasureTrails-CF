import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

export default class TrailInfoMetaIcons extends PureComponent {
  parseDuration = (duration) => {
    let hours = duration / 60;
    hours = this.roundToInc(hours, 0.25);
    return hours;
  }

  roundToInc = (num, inc) => {
    const diff = num % inc;
    return diff > inc / 2 ? (num - diff + inc) : num - diff;
  }

  renderTags = (tags) => {
    let tagOut = '';
    for (let i = 0; i < tags.length - 1; i += 1) {
      tagOut += `${tags[i]}, `;
    }
    tagOut += tags[tags.length - 1];
    return tagOut;
  }

  render() {
    const { trail } = this.props;
    const {
      duration,
      transport,
      tags,
      isAccessible
    } = trail;

    return (
      <View>
        <Text>
          {`Duration: ${this.parseDuration(duration)} hours`}
        </Text>
        <Text>
          {`${transport.mode}: ${(transport.distance) / 1000}km`}
        </Text>
        <Text>
          {this.renderTags(tags)}
        </Text>
        <Text>
          {`Wheelchair Accessible: ${isAccessible.wheelchair ? 'yes' : 'no'}`}
        </Text>
        <Text>
          {`Pushchair Accessible: ${isAccessible.pushchair ? 'yes' : 'no'}`}
        </Text>
      </View>
    );
  }
}
