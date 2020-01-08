/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import { AsyncStorage } from 'react-native';

import { observable, action, runInAction } from 'mobx';
import { toSearch } from '../../servers/Search';

class SearchMobx {
  @observable
  loginData: Object;
  @observable
  params: Object = {};
	@observable
	searchData:Object;


  
	/*搜索*/
	@action.bound
	async search(params: any) {
	  try {
	    // 调用登录接口，这里暂时没有使用哦
	    // const data = await fetchLogin(...params);
	    // console.log('responseData', data);
			const searchData = await toSearch(params);
			return searchData;
			runInAction(() => {
			  this.searchData = searchData;
			});
	  } catch (e) {
	    console.log(e);
	    throw e;
	  }
	}
	
}

export { SearchMobx };
