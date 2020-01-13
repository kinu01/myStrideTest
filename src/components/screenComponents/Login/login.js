import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import CustomInput from '../../customInput';
import ActionButton from '../../actionButton';
import AppStyles from '../../../constants/AppStyles';

export default function Login({onSubmit}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberErr, setIsPhoneNumberErr] = useState(true);
  const prefixText = useRef('+234');

  const formatPhoneNumber = phone => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return null;
  };

  const onChangePhoneNumber = phone => {
    const formattedNumber = formatPhoneNumber(phone);

    if (!formattedNumber) {
      setIsPhoneNumberErr(true);
    } else {
      setIsPhoneNumberErr(false);
    }
    setPhoneNumber(formattedNumber);
  };

  const getBorderLineColor = (isValid, value) => {
    if (value && isValid) {
      return {
        borderColor: AppStyles.colorSet.primaryActionGreen,
      };
    }

    if (value !== '') {
      return {
        borderColor: AppStyles.colorSet.primaryBrandYellow,
      };
    }
  };

  const onSubmitEditing = () => {
    const submitObject = {
      phone: `${prefixText.current}${phoneNumber.split('-').join('')}`,
    };

    if (!isPhoneNumberErr) {
      onSubmit(submitObject);
    }
  };

  return (
    <View style={{paddingTop: 60}}>
      <CustomInput
        placeholder={'Your country'}
        keyboardType={'default'}
        value={'United State'}
        editable={false}
        containerStyle={{borderColor: AppStyles.colorSet.primaryActionGreen}}
      />
      <CustomInput
        prefixText={prefixText.current}
        placeholder={'Your phone number'}
        keyboardType={'numeric'}
        onChangeText={onChangePhoneNumber}
        value={phoneNumber}
        editable={true}
        containerStyle={getBorderLineColor(!isPhoneNumberErr, phoneNumber)}
        onSubmitEditing={onSubmitEditing}
        errorText={
          isPhoneNumberErr &&
          phoneNumber !== '' &&
          'Please enter a valid 10 digit mobile number'
        }
      />
      <ActionButton
        containerStyle={
          !isPhoneNumberErr && {
            backgroundColor: AppStyles.colorSet.primaryActionGreen,
          }
        }
        title={'CONTINUE'}
        disabled={isPhoneNumberErr}
        onPress={onSubmitEditing}
      />
    </View>
  );
}
