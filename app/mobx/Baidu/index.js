/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import { AsyncStorage } from 'react-native';

import { observable, action, runInAction } from 'mobx';
import { toBaidu,toUpload } from '../../servers/Baidu';

class BaiduMobx {
  @observable
  params: Object = {};
	@observable
	baiduData:Object;
	@observable
	uploadData:Object;

  /**
   * 获取用户输入的手机号和验证码
   * @param value
   * @param type
   */
  @action.bound
  setLoginData(value: string, type: string) {
    this.params[type] = value;
  }

  /**
   * 发送验证码
   * @param params
   * @returns {Promise<void>}
   */
  @action.bound
  async sendCode(params: any) {
    try {
      // 调用发送验证码接口
      // const data = await fetchSendCode(...params);
      // console.log('responseData', data);
      return '1234';
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

 

  
	
	/*获取token*/
	@action.bound
	async baidu() {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const baiduData = await toBaidu();
			return baiduData;
			runInAction(() => {
			  this.baiduData = baiduData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
	/*智能识别*/
	@action.bound
	async upload(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const uploadData = await toUpload(params);
			return uploadData;
			runInAction(() => {
			  this.uploadData = uploadData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
	
}

export { BaiduMobx };
