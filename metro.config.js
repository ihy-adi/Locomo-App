// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'];

module.exports = defaultConfig;