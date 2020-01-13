import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen, SignupScreen, ConfirmationScreen} from '../screens';
import AppStyles from '../constants/AppStyles';

const AuthStackNavigator = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    Confirmation: {screen: ConfirmationScreen},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'float',
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
      },
    },
  },
);

export default AuthStackNavigator;
