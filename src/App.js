import React, {useEffect} from 'react';
import AppContainer from './navigators/RootNavigator';

const App = () => {
  useEffect(() => {
    console.disableYellowBox = true;
  }, []);
  return <AppContainer />;
};

export default App;
