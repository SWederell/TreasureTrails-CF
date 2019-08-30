import { createAppContainer, createStackNavigator } from 'react-navigation';

import LibraryScreen from '../screens/LibraryScreen';
import TrailInfoScreen from '../screens/TrailInfoScreen';
import TrailScreen from '../screens/TrailScreen';

export default createAppContainer(
  createStackNavigator(
    {
      Library: LibraryScreen,
      TrailInfo: TrailInfoScreen,
      Trail: TrailScreen
    },
    {
      initialRouteName: 'Library'
    }
  )
);
