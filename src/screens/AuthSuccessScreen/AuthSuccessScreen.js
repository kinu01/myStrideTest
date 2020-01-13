import React, {useRef, useState} from 'react';
import {AuthSuccess} from '../../components';
import AppStyles from '../../constants/AppStyles';
import {lambda} from '../../services/AWS';
import {removeDeviceUserSession} from '../../utils/deviceStorage';

AuthSuccessScreen.navigationOptions = () => {
  return {
    headerTitle: 'Auth Success!',
    headerStyle: {
      backgroundColor: AppStyles.colorSet.primaryActionGreen,
      borderBottomWidth: 0,
    },
    headerTintColor: AppStyles.colorSet.mainThemeBackgroundColor,
  };
};

export default function AuthSuccessScreen({navigation}) {
  const session = useRef(navigation.getParam('session'));
  const [testResult, setTestResult] = useState({});

  const onLogout = () => {
    removeDeviceUserSession();
    navigation.navigate('Auth');
  };

  const onLambdaTest = () => {
    const params = {
      FunctionName: 'getUserProperties',
      Payload: `{"id_token": "${session.current.idToken.jwtToken}"}`,
    };

    lambda.invoke(params, function(err, data) {
      if (err) {
        setTestResult(err.message);
      } else {
        setTestResult(data.Payload);
      }
    });
  };

  return (
    <AuthSuccess
      session={session.current}
      onLambdaTest={onLambdaTest}
      onLogout={onLogout}
      testResult={testResult}
    />
  );
}
