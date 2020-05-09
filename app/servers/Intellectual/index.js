/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */

import { Fetch } from '../../utils';

import { RTSearchDetail } from './interfaces';



export async function toIntellectual(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.intellectual.intellectual;

  return await Fetch.post(url, params);
}
export async function toIntellectualmine(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.intellectual.intellectualmine;

  return await Fetch.post(url, params);
}
export async function toIntellectualdelect(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.intellectual.intellectualdelect;

  return await Fetch.post(url, params);
}

export async function toIntellectualadd(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.intellectual.intellectualadd;

  return await Fetch.post(url, params);
}