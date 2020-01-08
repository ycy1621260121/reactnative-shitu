/**
 * @flow
 * Created by Rabbit on 2018/9/12.
 */

/**
 * 上传token的数据类型
 */


/**
 *  搜索图片返回的类型
 */
export interface RTUser {
  data: RTUserData;
  success: boolean;
}

export interface RTUser {
  code: string;
  message: string;
	list: string;
	sessionToken:string;
	username:string;
	headImg:string;
}
