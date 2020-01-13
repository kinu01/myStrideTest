import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import AppStyles from '../constants/AppStyles';

export default function customInput(props) {
  const {
    placeholder,
    keyboardType,
    prefixText,
    onChangeText,
    value,
    containerStyle,
    editable,
    errorText,
    onSubmitEditing,
  } = props;

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, containerStyle]}>
        {prefixText && <Text style={styles.text}>{prefixText}</Text>}
        <TextInput
          style={styles.input}
          editable={editable}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          underlineColorAndroid="transparent"
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
  },
  inputContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    height: 45,
    width: '80%',
    borderRadius: 23,
    borderColor: AppStyles.colorSet.secondaryActionGray,
    borderWidth: 2,
    flexDirection: 'row',
  },
  input: {
    height: '100%',
    width: '80%',
    paddingHorizontal: 20,
    color: AppStyles.colorSet.primaryTextGray,
  },
  text: {
    paddingLeft: 20,
    // paddingTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: AppStyles.colorSet.primaryBrandYellow,
    fontSize: 12,
    padding: 5,
  },
});
