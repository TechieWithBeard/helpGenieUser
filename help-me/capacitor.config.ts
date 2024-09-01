import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.helpgenie.helpgenie',
  appName: 'Help Genie',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
    
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
    CapacitorHttp: {
      enabled: false,
    },
  },
  ios: {
    // ... additional configuration
    handleApplicationNotifications: false
  }
};

export default config;
