# study_vue Setting

This template should help get you started developing with Vue 3 in Vite.

## version
node : 22
vue : 3

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

# New vue project setting

- 프로젝트를 생성 할 위치에서 터미널 실행

- my-project라는 vue 프로젝트 생성

```sh
npm create vue@latest my-project
```

- 필요한 패키지 선택 
    - 지금 선택안해도 나중에 설치 가능

```sh
◆  Select features to include in your project: (↑/↓ to navigate, space to
select, a to toggle all, enter to confirm)
│  ◻ TypeScript
│  ◻ JSX Support
│  ◻ Router (SPA development)
│  ◻ Pinia (state management)
│  ◻ Vitest (unit testing)
│  ◻ End-to-End Testing
│  ◻ ESLint (error prevention)
│  ◻ Prettier (code formatting)
``` 

- 부가 기능 선택
    - 테스트중인 기능들로 선택 안하는걸 권유
    - Oxlint : Rust로 작성된 매우 빠른 JavaScript/TypeScript linter
    - rolldown-vite : Rollup의 Rust 기반 재구현체

```sh
◆  Select experimental features to include in your project: (↑/↓ to navigate,
space to select, a to toggle all, enter to confirm)
│  ◻ Oxlint (experimental)
│  ◻ rolldown-vite (experimental)
```

- 프로젝트에 예제 소스 포함 여부 선택
```sh
◆  Skip all example code and start with a blank Vue project?
│  ○ Yes / ● No
```

- 프로젝트가 세팅된 폴더에서 터미널 실행하거나 에디터에서 해당 폴더 실행
```sh
cd my-project
npm install
npm run dev
```

---

# study_vue 기본 구조

## 설정 파일
- **package.json**
    - Vue 3.5.18과 Vue Router 4.5.1 사용
    - Vite를 번들러로 사용
    - npm run dev 명령어로 Vite 개발 서버 실행

- **vite.config.js**
    - Vite 설정 파일
    - Vue 플러그인과 개발자 도구 활성화
    - @ 별칭을 src 폴더로 설정


## vue 프로젝트 구동 순서 (npm run dev 동작시)
1. Vite 개발 서버 시작 (vite.config.js)
2. 진입점 실행 (src/main.js) : CSS 로드, Vue 앱 생성, 라우터 등록
3. App 컴포넌트 마운트 (src/App.vue) : Named View 구조로 레이아웃 설정
4. 라우터 설정 (src/router/router.js → src/router/routes.js)
5. 라우트별 컴포넌트 렌더링 : 각 영역별 컴포넌트가 순차적으로 렌더링

## 소스 설명

- **main.js**
```js
import './assets/main.css'  // 전역 CSS 로드

import { createApp } from 'vue'  // Vue 3 앱 생성 함수
import App from './App.vue'  // 루트 컴포넌트
import router from './router/router.js'  // 라우터 설정

const app = createApp(App)  // Vue 앱 인스턴스 생성
app.use(router)  // 라우터 등록
app.mount('#app')  // DOM에 마운트
```

- **App.vue**
```vue
<template>
  <!-- Named View를 사용한 레이아웃 구성 -->
  <!-- 각 영역별로 다른 컴포넌트를 렌더링 -->
  <router-view name="header" />  <!-- 헤더 영역 컴포넌트 -->
  <router-view name="menu" />    <!-- 메뉴 영역 컴포넌트 -->
  <router-view />                <!-- 메인 콘텐츠 영역 (default) -->
  <router-view name="footer" />  <!-- 푸터 영역 컴포넌트 -->
</template>

<script>
export default {
  name: 'App',  // 컴포넌트 이름
}
</script>
```

- **router.js**
```js
// Vue Router 관련 함수들 import
import { createRouter, createWebHistory } from 'vue-router'
// 라우트 설정들을 import
import routes from './routes'

// Vue Router 인스턴스 생성
const router = createRouter({
  history: createWebHistory(),  // HTML5 History 모드 사용 (URL에 # 없음)
  routes  // 라우트 설정 배열
})

// 라우터 인스턴스를 export
export default router
```

- **routes.js**
```js
// 각 기능별 라우터 설정들을 import
import { HomeRouter } from './home.js'  // 홈 관련 라우트

// 모든 라우트를 통합하는 배열
const routes = [
    ...HomeRouter  // 홈 라우터를 스프레드 연산자로 펼쳐서 추가
]

// 통합된 라우트 설정을 export
export default routes

```

- **Home.vue**
```vue
<template>
  <div align="center">
    <h1>Home</h1>
    <!-- 현재 시간을 동적으로 표시 -->
    <p>{{ getServerTime() }}</p>
  </div>
</template>

<script>

export default {
  name: 'HomeComponent',  // 컴포넌트 이름

  // Vue 3 Composition API 사용
  setup() {
    // 현재 시간을 반환하는 함수
    const getServerTime = () => {
      return new Date().toLocaleString()
    }

    // 템플릿에서 사용할 함수들을 반환
    return {
      getServerTime,
    }
  },
}
</script>
```

- **home.js**
```js
// 홈 페이지와 관련 컴포넌트들을 import
import Home from '../views/Home.vue'                    // 홈 페이지 메인 컴포넌트
import MainHeader from '../components/common/MainHeader.vue'  // 메인 헤더 컴포넌트
import MenuBar from '../components/common/MenuBar.vue'        // 메뉴바 컴포넌트
import MainFooter from '../components/common/Footer.vue'      // 푸터 컴포넌트

// 홈 관련 라우터 설정 배열
export const HomeRouter = [
  {
    path: '/',                    // URL 경로 (루트 경로)
    name: 'HomeRouter',          // 라우트 이름 (프로그래밍 방식 네비게이션용)
    components: {                // Named View를 사용하여 여러 컴포넌트를 동시에 렌더링
      header: MainHeader,        // 헤더 영역에 MainHeader 컴포넌트
      menu: MenuBar,             // 메뉴 영역에 MenuBar 컴포넌트
      footer: MainFooter,        // 푸터 영역에 MainFooter 컴포넌트
      default: Home,             // 기본 영역(메인 콘텐츠)에 Home 컴포넌트
    },
  },
]
```
