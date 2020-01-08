/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */

import { Fetch } from '../../utils';

import { RTSearchDetail } from './interfaces';


export async function toLogin(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.user.login;

  return await Fetch.post(url, params);
}
export async function toRegister(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.user.register;

  return await Fetch.post(url, params);
}
export async function getUserInfo(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.user.userInfo;

  return await Fetch.post(url, params);
}