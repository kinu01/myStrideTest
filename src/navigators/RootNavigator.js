import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AppStyles from '../constants/AppStyles';
import {PostSplash} from '../screens';
import MainStack from './MainStackNavigator';
import AuthStack from './AuthStackNavigator';

const RootNavigator = createSwitchNavigator(
  {PostSplash: PostSplash, Main: MainStack, Auth: AuthStack},
  {
    initialRouteName: 'PostSplash',
    cardStyle: {
      backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
    },
  },
);

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
