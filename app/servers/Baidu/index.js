/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */

import { Fetch } from '../../utils';

import { RTSearchDetail } from './interfaces';


export async function toBaidu(): Promise<RTSearchDetail> {
  const url = ApiConfig.api.baiduapi.baidu;

  return await Fetch.get(url);
}
export async function toUpload(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.baiduapi.upload;

  return await Fetch.post(url, params);
}