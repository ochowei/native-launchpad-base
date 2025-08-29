import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.189eae6157b647b9bb5b60bb5b192f52',
  appName: 'TuneFlow - Music Player',
  webDir: 'dist',
  server: {
    url: 'https://189eae61-57b6-47b9-bb5b-60bb5b192f52.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1625',
      showSpinner: false
    }
  }
};

export default config;