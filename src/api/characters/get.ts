import { api } from '../client';
import type { ApiResponse } from '../types';
import type { Character } from './type';

export default async function get(name: string): Promise<Character> {
  const res = await api.get<ApiResponse<Character>>(`/characters/${name}`);
  return res.data.data;
}
