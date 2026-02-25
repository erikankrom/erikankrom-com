import * as migration_20260225_031626_initial from './20260225_031626_initial';
import * as migration_20260225_033213_add_resume_global from './20260225_033213_add_resume_global';

export const migrations = [
  {
    up: migration_20260225_031626_initial.up,
    down: migration_20260225_031626_initial.down,
    name: '20260225_031626_initial',
  },
  {
    up: migration_20260225_033213_add_resume_global.up,
    down: migration_20260225_033213_add_resume_global.down,
    name: '20260225_033213_add_resume_global'
  },
];
