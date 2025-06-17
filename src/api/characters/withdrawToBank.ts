import { delay } from '../../utils/time';
import { api } from '../client';
import type { ApiResponse } from '../types';
import type { BankItemTransactionSchema } from './type';

export default async function withdrawToBank(name: string, code: string, quantity: number): Promise<BankItemTransactionSchema> {
  console.log(`🏦 Retrait de ${quantity} ${code} de la banque`);
  const res = await api.post<ApiResponse<BankItemTransactionSchema>>(`/my/${name}/action/bank/withdraw`, {
    code,
    quantity,
  });
  await delay(res.data.data.cooldown.remaining_seconds * 1000);

  return res.data.data;
}