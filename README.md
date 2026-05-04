# 모먼 (Moment) - 여행 플래닝 & 소셜 기록 앱

React Native + Expo 기반의 여행 플래닝 및 소셜 기록 앱입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React Native 0.81.5, Expo ~54.0.33 |
| 언어 | TypeScript (Strict Mode) |
| 상태 관리 | Zustand v4 |
| 서버 상태 | @tanstack/react-query v5 |
| HTTP | Axios (JWT 인터셉터 포함) |
| 네비게이션 | React Navigation v6 (Stack + BottomTab + Drawer) |
| 스타일링 | NativeWind (Tailwind CSS) + StyleSheet |
| 지도 | react-native-maps |
| 차트 | react-native-chart-kit + react-native-svg |
| 국제화 | i18next (한국어/English/日本語) |
| 저장소 | @react-native-async-storage/async-storage |
| 날짜 | date-fns (Korean locale) |
| 카메라/갤러리 | expo-image-picker, expo-camera |
| 위치 | expo-location |
| 알림 | expo-notifications |


## 디자인 시스템

- **Primary**: `#FF6B35` (오렌지)
- **Cream**: `#FFF8F0` (배경)
- **Dark Navy**: `#1A1F36` (텍스트)
- **Border Radius**: 16px 기본
- **다크 모드**: 완전 지원

## 폴더 구조

```
moment-app/
├── App.tsx                    # 앱 엔트리 (Providers 설정)
├── global.css                 # NativeWind
├── src/
│   ├── api/                   # Axios API 모듈
│   │   ├── axios.ts           # 기본 인스턴스 + JWT 인터셉터
│   │   ├── auth.ts
│   │   ├── trip.ts
│   │   ├── blog.ts
│   │   ├── chat.ts
│   │   ├── expense.ts
│   │   └── place.ts
│   ├── components/
│   │   ├── common/            # 공용 컴포넌트 (15개)
│   │   ├── settings/          # 설정 컴포넌트
│   │   ├── trip/              # 여행 관련 컴포넌트
│   │   ├── blog/              # 블로그 컴포넌트
│   │   └── chat/              # 채팅 컴포넌트
│   ├── constants/
│   │   ├── theme.ts           # 색상, 타이포그래피, 스페이싱
│   │   └── mockData.ts        # 목업 데이터
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useAuth.ts
│   │   ├── useLocation.ts
│   │   └── useNotification.ts
│   ├── locales/               # i18n (ko/en/ja)
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── BottomTabNavigator.tsx  # FAB 중앙 버튼 포함
│   │   └── StackNavigator.tsx
│   ├── screens/
│   │   ├── auth/              # Splash, Onboarding, Login
│   │   ├── home/              # HomeScreen
│   │   ├── explore/           # Explore, PlaceDetail
│   │   ├── trip/              # List, Create, Detail, Edit, Schedule, Checklist
│   │   ├── blog/              # Feed, Detail, Comment, Write
│   │   ├── chat/              # ChatList, ChatRoom
│   │   ├── expense/           # Expense, ExpenseAdd
│   │   ├── challenge/         # ChallengeScreen
│   │   ├── mypage/            # MyPage, ProfileEdit
│   │   └── settings/          # Settings + 6개 하위 화면
│   ├── store/                 # Zustand 스토어
│   ├── types/                 # TypeScript 타입 정의
│   └── utils/                 # date, currency, location 유틸
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npx expo start

# iOS 시뮬레이터
npx expo start --ios

# Android 에뮬레이터
npx expo start --android
```

## 주요 기능

### 홈 탭
- 예정된 여행 카드 (D-Day 표시)
- 추천 장소 수평 스크롤
- 친구 여행 피드

### 탐색 탭
- 지도 / 리스트 뷰 전환 (react-native-maps)
- 카테고리 필터 (음식/자연/역사/액티비티/쇼핑)
- 장소 상세 (평점, 리뷰, 지도, 영업시간)

### 모먼+ (FAB)
- 여행 기록 쓰기 → BlogWriteScreen
- 여행 일정 만들기 → TripCreateScreen

### 채팅 탭
- 내 주변 / 여행방 탭
- 실시간 채팅 UI (말풍선)
- 번역 버튼

### 마이페이지 탭
- 프로필, 통계, 뱃지, 사진 그리드
- 경비 관리 (도넛 차트, 정산)
- 챌린지 (진행 중 / 완료)
- 설정 (테마, 언어, 알림, 개인정보)

## 백엔드 연동

`src/api/axios.ts`에서 `BASE_URL`을 실제 서버로 변경:

```ts
const BASE_URL = 'https://api.moment-app.com/v1';
```

JWT 토큰은 `AsyncStorage`에 자동 저장/로드되며, 401 응답 시 자동 갱신합니다.
