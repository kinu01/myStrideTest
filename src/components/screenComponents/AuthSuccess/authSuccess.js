import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ActionButton from '../../actionButton';
import AppStyles from '../../../constants/AppStyles';

export default function authSuccess({
  session,
  testResult,
  onLogout,
  onLambdaTest,
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, {flex: 4}]}>
        <Text style={styles.text}>{`ID_Token,:`}</Text>
        <Text
          style={[styles.text, styles.subText]}
          numberOfLines={4}>{`${session.idToken.jwtToken}`}</Text>
        <Text style={styles.text}>{`Access_Token: `}</Text>
        <Text
          style={[styles.text, styles.subText]}
          numberOfLines={4}>{`${session.accessToken.jwtToken}`}</Text>
        <Text style={styles.text}>{`Refresh_token:`}</Text>
        <Text
          style={[styles.text, styles.subText]}
          numberOfLines={4}>{`${session.refreshToken.token}`}</Text>
      </View>
      <View style={[styles.subContainer, styles.lamdaFunctionContainer]}>
        <ActionButton
          containerStyle={{
            backgroundColor: AppStyles.colorSet.primaryActionGreen,
          }}
          title={'TEST LAMBDA FUNCTION'}
          onPress={onLambdaTest}
        />
        <Text style={[styles.text, {paddingTop: 15}]} numberOfLines={4}>
          {JSON.stringify(testResult)}
        </Text>
      </View>
      <View style={[styles.subContainer, {flex: 1}]}>
        <ActionButton
          containerStyle={{
            backgroundColor: AppStyles.colorSet.primaryActionGreen,
          }}
          title={'LOGOUT'}
          onPress={onLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 20,
    alignItems: 'center',
  },
  lamdaFunctionContainer: {
    flex: 2,
    paddingTop: 25,
  },
  text: {
    color: AppStyles.colorSet.primaryTextGray,
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  subText: {
    color: AppStyles.colorSet.primaryTextGray,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
