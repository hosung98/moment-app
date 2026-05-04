/*
 파일명 : metro.config.js
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
