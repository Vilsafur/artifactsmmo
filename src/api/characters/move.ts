import { delay } from '../../utils/time';
import { api } from '../client';
import { Tile } from '../map/type';
import type { ApiResponse } from '../types';
import type { CharacterMovementDataSchema } from './type';

export default async function move(name: string, tile: Tile): Promise<CharacterMovementDataSchema> {
  const res = await api.post<ApiResponse<CharacterMovementDataSchema>>(`/my/${name}/action/move`, {
    x: tile.x,
    y: tile.y,
  });
  await delay(res.data.data.cooldown.remaining_seconds * 1000);

  return res.data.data;
}
