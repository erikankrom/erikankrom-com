import * as migration_20260225_052732_initial from './20260225_052732_initial';
import * as migration_20260225_053147_add_homepage_and_site_settings from './20260225_053147_add_homepage_and_site_settings';

export const migrations = [
  {
    up: migration_20260225_052732_initial.up,
    down: migration_20260225_052732_initial.down,
    name: '20260225_052732_initial',
  },
  {
    up: migration_20260225_053147_add_homepage_and_site_settings.up,
    down: migration_20260225_053147_add_homepage_and_site_settings.down,
    name: '20260225_053147_add_homepage_and_site_settings'
  },
];
