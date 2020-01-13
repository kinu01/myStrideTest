import React from 'react';
import {Login} from '../../components';
import {userPool, CognitoUser, AuthenticationDetails} from '../../services/AWS';
import AppStyles from '../../constants/AppStyles';

LoginScreen.navigationOptions = () => {
  return {
    headerTitle: 'Mobile Number',
    headerStyle: {
      backgroundColor: AppStyles.colorSet.primaryActionGreen,
      borderBottomWidth: 0,
    },
    headerTintColor: AppStyles.colorSet.mainThemeBackgroundColor,
  };
};

export default function LoginScreen({navigation}) {
  const onSubmit = async ({phone}) => {
    const userData = {
      Username: phone,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');

    const authenticationData = {
      Username: phone,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    cognitoUser.initiateAuth(authenticationDetails, {
      onSuccess: result => {
        console.log('custom result', result);
      },
      onFailure: err => {
        console.log('err err', err);
        if (err.code === 'UserNotFoundException') {
          navigation.navigate('Signup', {phoneNumber: phone});
        }
        if (err.code === 'UserNotConfirmedException') {
          navigation.navigate('Confirmation', {
            cognitoUser,
            phoneNumber: phone,
          });
        }
      },
      customChallenge: challengeParameters => {
        navigation.navigate('Confirmation', {
          cognitoUser,
          challengeParameters,
        });
      },
    });
  };

  return <Login onSubmit={onSubmit} />;
}
