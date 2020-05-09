/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */

import { Fetch } from '../../utils';

import { RTUser } from './interfaces';



export async function toUpdatauser(params: any): Promise<RTUser> {
  const url = ApiConfig.api.user.updatauser;

  return await Fetch.post(url, params);
}

export async function getUserInfo(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.user.userInfo;

  return await Fetch.post(url, params);
}