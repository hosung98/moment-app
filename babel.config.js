/*
 파일명 : babel.config.js
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
