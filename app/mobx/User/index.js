/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import { AsyncStorage } from 'react-native';

import { observable, action, runInAction } from 'mobx';
import { toUpdatauser,getUserInfo } from '../../servers/User';

class UserMobx {
  @observable
  params: Object = {};
	@observable
	updatauserData:Object;

	
	/*修改头像*/
	@action.bound
	async updatauser(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const updatauserData = await toUpdatauser(params);
			return updatauserData;
			runInAction(() => {
			  this.updatauserData = updatauserData;
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

export { UserMobx };
