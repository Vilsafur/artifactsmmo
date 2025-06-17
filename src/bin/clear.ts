import { config } from 'dotenv';
config();

import { clear } from '../store/team';

async function main() {
  await clear();
}

main();
