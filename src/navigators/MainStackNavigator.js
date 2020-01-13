import {createStackNavigator} from 'react-navigation-stack';
import {AuthSuccessScreen} from '../screens';
import AppStyles from '../constants/AppStyles';

const MainStackNavigator = createStackNavigator(
  {
    AuthSuccess: {screen: AuthSuccessScreen},
  },
  {
    initialRouteName: 'AuthSuccess',
    headerMode: 'float',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
      },
    },
  },
);

export default MainStackNavigator;
