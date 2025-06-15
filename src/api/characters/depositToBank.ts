import { delay } from '../../utils/time';
import { api } from '../client';
import type { ApiResponse } from '../types';
import type { CharacterMovementDataSchema } from './type';

export default async function depositToBank(name: string, code: string, quantity: number): Promise<CharacterMovementDataSchema> {
  const res = await api.post<ApiResponse<CharacterMovementDataSchema>>(`/my/${name}/action/bank/deposit`, {
    code,
    quantity,
  });
  await delay(res.data.data.cooldown.remaining_seconds * 1000);

  return res.data.data;
}