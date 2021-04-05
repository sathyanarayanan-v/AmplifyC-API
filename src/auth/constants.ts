import { readFileSync } from 'fs';
export const jwtConstants = {
  pk: readFileSync(process.env.JWT_PK_PATH),
  cert: readFileSync(process.env.JWT_CER_PATH),
};
