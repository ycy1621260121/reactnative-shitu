/**
 * @flow
 * Created by Rabbit on 2018/8/7.
 */

import { observable, action, computed, runInAction } from 'mobx';
import { AsyncStorage } from 'react-native';

const ST_BACKGROUND_IMAGE = 'ST_BACKGROUND_IMAGE';

class PowerStore {
  @observable
  ShiTuBackgroundImage: string;
	loginData:string;
	sessionToken:string;
	username:string;
	headImg:string;
	userinfoData:string;

  constructor() {
    this.handleShiTuBackgroundImage();
  }

  @action
  handleShiTuBackgroundImage = () => {
    let image_url;

    AsyncStorage.getItem(ST_BACKGROUND_IMAGE, (error, result) => {
      if (result === null) {
        image_url = 'https://ww1.sinaimg.cn/bmiddle/0065oQSqly1ftzsj15hgvj30sg15hkbw.jpg';
      } else {
        image_url = result;
      }
      runInAction(() => {
        this.ShiTuBackgroundImage = image_url;
      });
    });
  };

  @action.bound
  setShiTuBackgroundImage = async (url: string) => {
    console.log('setShiTuBackgroundImage', url);
    await AsyncStorage.setItem(ST_BACKGROUND_IMAGE, url);
    runInAction(() => {
      this.ShiTuBackgroundImage = url;
    });
  };
	
	
	@action.bound
	setSessionToken = async (sessionToken: string) => {
	  console.log('sessionToken', sessionToken);
	  await AsyncStorage.setItem('sessionToken', sessionToken);
	  runInAction(() => {
	    this.sessionToken = sessionToken;
	  });
	};
	
	@action.bound
	setUserinfoData = async (userinfoData: string) => {
	  console.log('userinfoData', userinfoData);
	  await AsyncStorage.setItem('userinfoData', JSON.stringify(userinfoData));
	  runInAction(() => {
	    this.userinfoData = userinfoData;
	  });
	};
	
	@action.bound
	setUsername = async (username: string) => {
	  console.log('username', username);
	  await AsyncStorage.setItem('username', username);
	  runInAction(() => {
	    this.username = username;
	  });
	};
	
	@action.bound
	setHeadImg = async (headImg: string) => {
	  console.log('headImg', headImg);
	  await AsyncStorage.setItem('headImg', headImg);
	  runInAction(() => {
	    this.headImg = headImg;
	  });
	};
	
	
}

export { PowerStore };
