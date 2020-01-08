/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */
import { System } from './index';

const base = {
  // baseURL: System.iOS ? 'http://localhost:3000/api' : 'http://192.168.31.236:3000/api',

  // baseURL:iOS?'http://localhost:1234/api':'http://10.0.2.2:1234/api',

  // baseURL:!iOS?'http://localhost:1234/api':'http://172.16.17.61:1234/api',

  // baseURL :__DEV__ ? iOS?'http://localhost:3000/api':'http://172.16.17.11:3000/api' : 'http://shitu.leanapp.cn/api'
  baseURL: 'http://shitu.leanapp.cn/api',
	locbaseURL: 'http://localhost:8089'
};

const ApiConfig = {
  api: {
    userToken: base.baseURL + '/userToken',
    shitu: {
      detailURL: base.baseURL + '/shitu/detailURL'
    },
    gank: {
      listData: base.baseURL + '/gank/listData'
    },
    user: {
      login: base.locbaseURL + '/login',
			register:base.locbaseURL + '/register',
			userInfo:base.locbaseURL + '/userInfo',
			alluser:base.locbaseURL + '/alluser',
			updatauser:base.locbaseURL + '/updatauser',
    },
		search:{
			search:base.locbaseURL + '/search',
		},
		intellectual:{
			intellectual:base.locbaseURL + '/intellectual',
			intellectualmine:base.locbaseURL + '/intellectualmine',
			intellectualdelect:base.locbaseURL + '/intellectualdelect',
			intellectualadd:base.locbaseURL + '/intellectualadd',
		},
		baiduapi:{
			baidu:base.locbaseURL + '/baidu',
			upload:base.locbaseURL + '/upload',
		},
    qiniu: {
      upLoadToken: base.baseURL + '/qiniu/upLoadToken'
    },
    test: {
      test: base.baseURL + '/test'
    }
  },
  qiniu: {
    upload: 'http://upload-z2.qiniu.com'
  }
};

export { ApiConfig };
