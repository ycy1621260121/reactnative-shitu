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
export interface RTSearchDetail {
  data: RTSearchDetailData;
  success: boolean;
}

export interface RTSearchDetailData {
  content: string;
}
