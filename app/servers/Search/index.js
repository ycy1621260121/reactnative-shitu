/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */

import { Fetch } from '../../utils';

import { RTSearchDetail } from './interfaces';



export async function toSearch(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.search.search;

  return await Fetch.post(url, params);
}