import {AsyncStorage} from 'react-native';

const LOGGED_IN_USER_SESSION = '@LOGGED_IN_USER_SESSION';

exports.setDeviceUserSession = async session => {
  try {
    await AsyncStorage.setItem(LOGGED_IN_USER_SESSION, JSON.stringify(session));
  } catch (err) {
    console.log(err);
  }
};

exports.getDeviceUserSession = async () => {
  try {
    const session = await AsyncStorage.getItem(LOGGED_IN_USER_SESSION);

    if (session !== null) {
      return JSON.parse(session);
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.removeDeviceUserSession = async () => {
  try {
    await AsyncStorage.removeItem(LOGGED_IN_USER_SESSION);
  } catch (err) {
    console.log(err);
  }
};
