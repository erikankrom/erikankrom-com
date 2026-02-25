import * as migration_20260225_052732_initial from './20260225_052732_initial';

export const migrations = [
  {
    up: migration_20260225_052732_initial.up,
    down: migration_20260225_052732_initial.down,
    name: '20260225_052732_initial'
  },
];
