import config from '../../config';
import { api } from '../client';
import { ApiResponse } from '../types';
import { type Item } from './type';

export default async function getAll(): Promise<Item[]> {
  const items = []
  if (config.debug) {
    console.log(`📡 Récupération de la page 1`)
  }
  let res = await api.get<ApiResponse<Item[]>>('/items');
  items.push(...res.data.data)
  
  while ((res.data.page ?? 1) < (res.data.pages ?? 1)) {
    const nextPage = (res.data.page ?? 1) + 1
    if (config.debug) {
      console.log(`📡 Récupération de la page ${nextPage}`)
    }
    res = await api.get<ApiResponse<Item[]>>(`/items?page=${nextPage}`);
    items.push(...res.data.data)
  }

  return items;
}
