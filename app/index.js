/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';
import { View, ActivityIndicator, DeviceEventEmitter, BackHandler, ToastAndroid } from 'react-native';

import { AuthLoadingRouter } from './routers/AuthLoading';
// import {SafeAreaView} from 'react-navigation';
import { Toast } from './components';
import { Provider } from 'mobx-react';
import * as RootStore from './store/RootStore';
import * as ajax from './utils/fetch';

import SplashScreen from 'react-native-splash-screen';

const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null;

export default class index extends React.Component<any> {
  toast: Toast;

  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    global.Toast = this.toast;
    SplashScreen.hide();
    DeviceEventEmitter.emit('badgeNumber', 30);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  };

  render() {
    return (
      <Provider {...RootStore} {...ajax}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white'
          }}
        >
          <AuthLoadingRouter
            persistenceKey={navigationPersistenceKey}
            renderLoadingExperimental={() => <ActivityIndicator size="large" color="black" />}
            onNavigationStateChange={(prevState, currentState) => {
              const AppRouter = currentState.routes[1];
              if (AppRouter.routes && AppRouter.routes.length > 1) {
                BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
              } else {
                BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
              }
            }}
          />
          <Toast ref={(t: any) => (this.toast = t)} />
        </View>
      </Provider>
    );
  }
}
