/*
 파일명 : nativewind-env.d.ts
 작성일 : 2026-05-04
 작성자 : 김호성
 수정내역 : 초기등록
*/
/// <reference types="nativewind/types" />

declare module '*.css' {
  const content: never;
  export default content;
}
