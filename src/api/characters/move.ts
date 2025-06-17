import { getBankTile } from '../../store/map';
import { delay } from '../../utils/time';
import { api } from '../client';
import { Tile } from '../map/type';
import type { ApiResponse } from '../types';
import type { CharacterMovementDataSchema } from './type';

export default async function move(name: string, tile: Tile): Promise<CharacterMovementDataSchema|false> {
  try {
    const res = await api.post<ApiResponse<CharacterMovementDataSchema>>(`/my/${name}/action/move`, {
      x: tile.x,
      y: tile.y,
    });
    await delay(res.data.data.cooldown.remaining_seconds * 1000);
  
    return res.data.data;
  } catch (error: any) {
    if (error.response?.status === 490) {
      console.log(`⚠️ ${name} est déjà sur cette case (${tile.x}, ${tile.y}). Aucune action n'est nécessaire.`);
      return false;
    }
    console.error(`❌ Erreur lors du déplacement de ${name} vers (${tile.x}, ${tile.y})`, error);
    throw error;    
  }
}

export async function moveToBank(name: string): Promise<CharacterMovementDataSchema|false> {
  const tile = getBankTile();
  return move(name, tile);
}
