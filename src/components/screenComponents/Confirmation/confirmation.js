import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Alert, StyleSheet, Text} from 'react-native';
import CustomInput from '../../customInput';
import AppStyles from '../../../constants/AppStyles';
import {setDeviceUserSession} from '../../../utils/deviceStorage';

export default function Confirmation({
  onCofirmLoginAuth,
  onConfirmRegistration,
  shouldConfirmRegistration,
  navigation,
}) {
  const [smsCode, setsmsCode] = useState('');
  const [isSMSCodeErr, setIsSMSCodeErr] = useState(false);
  const isConfirming = useRef(false);

  useEffect(() => {
    if (smsCode.length === 6 && !isConfirming.current) {
      onSubmitEditing();
      isConfirming.current = true;
    }
  }, [smsCode]);

  const onSMSCodeChange = code => {
    setsmsCode(code);
  };

  const getCodeBorderColor = () => {
    if (smsCode.length > 0 && smsCode !== '') {
      return {
        borderColor: AppStyles.colorSet.primaryTextGray,
      };
    }

    if (isSMSCodeErr) {
      return {
        borderColor: AppStyles.colorSet.primaryBrandYellow,
      };
    }

    if (!isSMSCodeErr) {
      return {
        borderColor: AppStyles.colorSet.primaryActionGreen,
      };
    }
  };

  const onCodeNotReceivedPress = () => {
    Alert.alert(
      'Not receiving SMS code?',
      'It may take a couple minutes for your sms code to arrive. Would you like to go back and wait',
      [
        {
          text: 'Go back',
        },
        {text: 'Get help'},
      ],
      {cancelable: false},
    );
  };

  const onSubmitEditing = () => {
    if (shouldConfirmRegistration) {
      onConfirmRegistration(smsCode, ({success, session}) => {
        setsmsCode('');
        isConfirming.current = false;
        if (success) {
          setDeviceUserSession(session);
          navigation.navigate('AuthSuccess', {session});
          setIsSMSCodeErr(false);
        } else {
          setIsSMSCodeErr(true);
        }
      });
      return;
    }
    onCofirmLoginAuth(smsCode, ({success, session}) => {
      setsmsCode('');
      isConfirming.current = false;
      if (success) {
        setDeviceUserSession(session);
        navigation.navigate('AuthSuccess', {session});
        setIsSMSCodeErr(false);
      } else {
        setIsSMSCodeErr(true);
      }
    });

    return;
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder={'SMS Code'}
        keyboardType={'numeric'}
        onChangeText={onSMSCodeChange}
        value={smsCode}
        editable={true}
        containerStyle={getCodeBorderColor()}
        errorText={isSMSCodeErr && 'The code entered was not correct'}
      />
      <TouchableOpacity
        style={styles.codeNotReceiveContainer}
        activeOpacity={0.7}
        onPress={onCodeNotReceivedPress}>
        <Text style={styles.codeNotReceive}>{"Didn't receive a code?"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  codeNotReceiveContainer: {
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeNotReceive: {
    fontSize: 16,
    textAlign: 'center',
    color: AppStyles.colorSet.secondaryActionGray,
  },
});
