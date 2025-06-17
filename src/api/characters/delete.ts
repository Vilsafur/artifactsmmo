import { api } from '../client';
import { Character } from './type';

export default async function deleteCharacter(name: string): Promise<Character> {
  const res = await api.post('/characters/delete', {
    name
  });

  return res.data.data;
}
