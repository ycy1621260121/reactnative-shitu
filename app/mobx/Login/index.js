/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import { AsyncStorage } from 'react-native';

import { observable, action, runInAction } from 'mobx';
import { toLogin,toRegister,getUserInfo } from '../../servers/Login';

class LoginMobx {
  @observable
  loginData: Object;
  @observable
  params: Object = {};
	@observable
	registerData:Object;
	@observable
	userInfoData:Object;

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

  /**
   * 判断用户是否输入手机号和验证码
   * @returns {boolean}
   */
  @action.bound
  checkObj() {
    const typeArr = [{ key: 'mobile', value: '手机号' }, { key: 'code', value: '验证码' }];
    for (let i = 0; i < typeArr.length; i++) {
      if (!this.params[typeArr[i].key]) {
        console.log(typeArr[i].value + '不能为空');
        return false;
      }
    }
    return true;
  }

  /**
   * 登录
   * @param params
   * @returns {Promise<void>}
   */
  @action.bound
  async login(params: any) {
    try {
      // 调用登录接口，这里暂时没有使用哦
      // const data = await fetchLogin(...params);
      // console.log('responseData', data);
			const loginData = await toLogin(params);
			return loginData;
			runInAction(() => {
			  this.loginData = loginData;
			});
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
	
	
	
	/*用户信息*/
	@action.bound
	async userInfo(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
	
			const userInfoData = await getUserInfo(params);
			return userInfoData;
			runInAction(() => {
			  this.userInfoData = userInfoData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
}

export { LoginMobx };
