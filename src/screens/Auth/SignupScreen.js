import React, {useRef} from 'react';
import {Signup} from '../../components';
import {userPool, CognitoUserAttribute, CognitoUser} from '../../services/AWS';
import AppStyles from '../../constants/AppStyles';

SignupScreen.navigationOptions = () => {
  return {
    headerTitle: 'Signup',
    headerStyle: {
      backgroundColor: AppStyles.colorSet.primaryActionGreen,
      borderBottomWidth: 0,
    },
    headerTintColor: AppStyles.colorSet.mainThemeBackgroundColor,
  };
};

export default function SignupScreen({navigation}) {
  const phoneNumber = useRef(navigation.getParam('phoneNumber'));

  const onSubmit = async ({firstName, lastName, email, password}) => {
    const userData = {
      Username: phoneNumber.current,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');

    const userFields = [
      {Name: 'email', Value: email},
      {Name: 'phone_number', Value: phoneNumber.current},
      {Name: 'given_name', Value: firstName},
      {Name: 'family_name', Value: lastName},
      {Name: 'locale', Value: 'US'},
    ];

    const userInfos = userFields.map(({Name, Value}) => {
      return new CognitoUserAttribute({
        Name,
        Value,
      });
    });

    persistSignupData(userPool, {
      userInfos,
      password,
      phoneNumber: phoneNumber.current,
      cognitoUser,
    });
  };

  const persistSignupData = async (
    userPool,
    {userInfos, password, phoneNumber, cognitoUser},
  ) => {
    try {
      await userPool.signUp(
        phoneNumber,
        password,
        userInfos,
        null,
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          navigation.navigate('Confirmation', {
            cognitoUser,
            phoneNumber,
          });
        },
      );
    } catch (error) {
      console.log('signupError', error.message);
    }
  };

  return <Signup onSubmit={onSubmit} />;
}
