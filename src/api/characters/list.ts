import { api } from '../client';
import type { ApiResponse } from '../types';
import type { Character } from './type';

export default async function list(): Promise<Character[]> {
  const res = await api.get<ApiResponse<Character[]>>('/my/characters');
  return res.data.data;
}
