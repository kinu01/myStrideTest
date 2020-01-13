import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {uuid} from 'uuidv4';
import CustomInput from '../../customInput';
import ActionButton from '../../actionButton';
import AppStyles from '../../../constants/AppStyles';

export default function Signup({onSubmit}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const areAllFieldsValid =
    lastName.length > 1 && firstName.length > 1 && isEmailValid;

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  const validateEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const onChangeEmail = text => {
    setEmail(text);
  };

  const onChangeFirstName = text => {
    setFirstName(text);
  };

  const onChangeLastName = text => {
    setLastName(text);
  };

  const onContinue = () => {
    const submitObject = {
      password: `${uuid()
        .split('-')
        .join('')}Z@0`,
      email,
      firstName,
      lastName,
    };

    onSubmit(submitObject);
  };

  const getBorderLineColor = (isValid, value) => {
    if (value && isValid) {
      return {
        borderColor: AppStyles.colorSet.primaryActionGreen,
      };
    }

    if (value) {
      return {
        borderColor: AppStyles.colorSet.primaryBrandYellow,
      };
    }
  };

  return (
    <View style={{paddingTop: 60}}>
      <CustomInput
        placeholder={'Email'}
        keyboardType={'default'}
        value={email}
        onChangeText={onChangeEmail}
        editable={true}
        containerStyle={getBorderLineColor(isEmailValid, email)}
      />
      <CustomInput
        placeholder={'First name'}
        keyboardType={'default'}
        value={firstName}
        onChangeText={onChangeFirstName}
        editable={true}
        containerStyle={getBorderLineColor(firstName.length > 1, firstName)}
      />
      <CustomInput
        placeholder={'Last name'}
        keyboardType={'default'}
        value={lastName}
        onChangeText={onChangeLastName}
        editable={true}
        containerStyle={getBorderLineColor(lastName.length > 1, lastName)}
      />
      <ActionButton
        containerStyle={
          areAllFieldsValid && {
            backgroundColor: AppStyles.colorSet.primaryActionGreen,
          }
        }
        title={'CONTINUE'}
        disabled={!areAllFieldsValid}
        onPress={onContinue}
      />
    </View>
  );
}
