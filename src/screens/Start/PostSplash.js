import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppStyles from '../../constants/AppStyles';
import {getDeviceUserSession} from '../../utils/deviceStorage';

export default function PostSplash({navigation}) {
  const getSessionFromDevice = async () => {
    try {
      const session = await getDeviceUserSession();
      if (session) {
        navigation.navigate('AuthSuccess', {session});
      } else {
        // navigation.navigate('AuthSuccess', {session});
        navigation.navigate('Auth');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSessionFromDevice();
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.mainThemeBackgroundColor,
  },
});
