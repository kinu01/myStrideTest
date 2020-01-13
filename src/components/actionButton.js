import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import AppStyles from '../constants/AppStyles';

export default function submitButton({
  disabled,
  onPress,
  title,
  containerStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonContainer, containerStyle]}
      activeOpacity={0.7}>
      <Text style={styles.submitText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '80%',
    borderRadius: 23,
    backgroundColor: AppStyles.colorSet.primaryBrandGray,
  },
  submitText: {
    color: AppStyles.colorSet.mainThemeBackgroundColor,
  },
});
