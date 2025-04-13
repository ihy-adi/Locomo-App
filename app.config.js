export default {
  expo: {
    name: "Locomo-App",
    slug: "locomo",
    scheme: "locomo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/Locomo_logo.jpeg",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/Locomo_logo.jpeg",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.locomo",
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/Locomo_logo.jpeg",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/Locomo_logo.jpeg",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      testVar: process.env.EXPO_PUBLIC_TEST_VAR,
    },
  },
};