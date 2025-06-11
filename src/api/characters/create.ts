import { api } from '../client';
import { Character } from '../types';

export default async function create(config: Character) {
  const res = await api.post('/characters/create', {
    name: config.name,
    skin: config.skin
  });

  return res.data.data;
}
