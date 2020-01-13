import React, {useRef, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Confirmation} from '../../components';
import AppStyles from '../../constants/AppStyles';

ConfirmationScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: navigation.state.params.phoneNumber,
    headerStyle: {
      backgroundColor: AppStyles.colorSet.primaryActionGreen,
      borderBottomWidth: 0,
    },
    headerTintColor: AppStyles.colorSet.mainThemeBackgroundColor,
  };
};

export default function ConfirmationScreen({navigation}) {
  const cognitoUser = useRef(navigation.getParam('cognitoUser'));
  const phoneNumber = useRef(navigation.getParam('phoneNumber'));
  const [shouldConfirmRegistration, setShouldConfirmRegistration] = useState(
    false,
  );

  useEffect(() => {
    if (phoneNumber.current) {
      setShouldConfirmRegistration(true);
      cognitoUser.current.resendConfirmationCode((err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log('resendConfirmationCode result: ', result);
      });
    }
  }, []);

  const onConfirmRegistration = (code, callback) => {
    cognitoUser.current.confirmRegistration(code, true, (err, result) => {
      if (err) {
        callback({success: false, err});
        alertIncorrectCode();
        return;
      }
      Alert.alert(
        'User Confirmed',
        'Kindly Login with phone number',
        [
          {
            text: 'Go back',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        {cancelable: false},
      );
    });
  };

  const onCofirmLoginAuth = (code, callback) => {
    cognitoUser.current.sendCustomChallengeAnswer(code, {
      onSuccess: session => {
        callback({success: true, session});
      },
      onFailure: err => {
        callback({success: false, err});
        console.log('confirmation err', err);
        alertIncorrectCode();
      },
    });
  };

  const alertIncorrectCode = () => {
    Alert.alert(
      'Incorrect SMS code!',
      'The code entered was not correct. Kindly go back to get new code',
      [
        {
          text: 'Go back',
          onPress: () => navigation.goBack(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Confirmation
      onCofirmLoginAuth={onCofirmLoginAuth}
      shouldConfirmRegistration={shouldConfirmRegistration}
      onConfirmRegistration={onConfirmRegistration}
      navigation={navigation}
    />
  );
}
