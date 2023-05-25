import { registerAs } from '@nestjs/config';

export const ADMIN_CONFIG = registerAs('ADMIN', () => {
  return {
    EMAIL: process.env['ADMIN_EMAIL'],
    PASSWORD: process.env['ADMIN_PASSWORD'],
  };
});
