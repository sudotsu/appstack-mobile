import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.masterylab.app',
  appName: 'Mastery Lab',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
