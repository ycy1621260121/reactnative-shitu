/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import { AsyncStorage } from 'react-native';

import { observable, action, runInAction } from 'mobx';
import { toIntellectual,toIntellectualmine ,toIntellectualdelect,toIntellectualadd } from '../../servers/Intellectual';

class IntellectualMobx {
  @observable
  loginData: Object;
  @observable
  params: Object = {};
	@observable
	intellectualData:Object;
	@observable
	intellectualmineData:Object;
	@observable
	intellectualdelectData:Object;
	@observable
	intellectualaddData:Object;


  
	/*知识产权*/
	@action.bound
	async intellectual(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const intellectualData = await toIntellectual(params);
			return intellectualData;
			runInAction(() => {
			  this.intellectualData = intellectualData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
	
	
	/*我的创新*/
	@action.bound
	async intellectualmine(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const intellectualmineData = await toIntellectualmine(params);
			return intellectualmineData;
			runInAction(() => {
			  this.intellectualmineData = intellectualmineData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
	
	/*删除我的创新*/
	@action.bound
	async intellectualdelect(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const intellectualdelectData = await toIntellectualdelect(params);
			return intellectualdelectData;
			runInAction(() => {
			  this.intellectualdelectData = intellectualdelectData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
	
	/*添加我的创新*/
	@action.bound
	async intellectualadd(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const intellectualaddData = await toIntellectualadd(params);
			return intellectualaddData;
			runInAction(() => {
			  this.intellectualaddData = intellectualaddData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
}

export { IntellectualMobx };
