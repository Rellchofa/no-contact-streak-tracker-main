
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3420582cec8640b79c68b269f5327ff6',
  appName: 'no-contact-streak-tracker',
  webDir: 'dist',
  server: {
    url: 'https://3420582c-ec86-40b7-9c68-b269f5327ff6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      gradleArgs: ["-PcdvMinSdkVersion=21"]
    }
  }
};

export default config;
