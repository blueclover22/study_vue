# study_vue Setting

This template should help get you started developing with Vue 3 in Vite.

## version
- node : 22
- vue : 3

## Server
- [springboot](https://github.com/blueclover22/study_springboot)

## vscode Setup

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


---
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

---
---
# 부모 - 자식 컴포넌트 연결 구조 [ex. AdminSetup.vue(부모) - AdminSetupForm.vue(자식)]

- **AdminSetup.vue / 부모**
```vue
<template>
  <div align="center">
    <h2>Admin Setup</h2>
    <!-- 자식 컴포넌트 AdminSetupForm을 kebab-case로 사용 -->
    <!-- @register-admin은 자식에서 발생하는 커스텀 이벤트를 수신 -->
    <!-- registerAdmin 함수를 이벤트 핸들러로 연결 -->
    <admin-setup-form @register-admin="registerAdmin" />
  </div>
</template>

<script>
// 자식 컴포넌트 import
import AdminSetupForm from '../../components/member/AdminSetupForm.vue'
// HTTP 클라이언트 import
import client from '../../modules/client'
// 라우터 import
import { router } from '../../router/router'

export default {
  name: 'AdminSetupComponent',
  // 사용할 자식 컴포넌트 등록
  // PascalCase 로 등록
  components: {
    AdminSetupForm,
  },

  setup() {
    // 자식 컴포넌트에서 발생한 'register-admin' 이벤트를 처리하는 함수
    // adminData 매개변수는 자식에서 emit으로 전달한 데이터 객체
    const registerAdmin = (adminData) => {
      // 구조분해할당으로 관리자 정보 추출
      const { userId, userPw, userName } = adminData
      
      // 백엔드 API에 관리자 등록 요청 전송
      client
        .post('/users/setup', { userId, userPw, userName })
        .then((response) => {
          router.push({               // 홈 페이지로 라우팅
            name: 'HomeRouter',
          })
        })
        .catch((error) => {
          alert(error.response.data)  
        })
    }
    
    // 템플릿에서 사용할 함수 반환
    return {
      registerAdmin,
    }
  },
}
</script>
```

- **AdminSetupForm.vue / 자식**
```vue
<template>
  <!-- 폼 제출 이벤트를 fireResgisterAdmin 함수에 바인딩 -->
  <!-- .prevent는 기본 폼 제출 동작을 막고 preventDefault()를 자동 호출 -->
  <form @submit.prevent="fireResgisterAdmin">
    <table>
      <tbody>
        <tr>
          <td>관리자 아이디 :</td>
          <td>
            <!-- v-model로 userId ref 변수와 양방향 바인딩 -->
            <input type="text" v-model="userId" />
          </td>
        </tr>
        <tr>
          <td>관리자 비밀번호 :</td>
          <td>
            <!-- v-model로 userPw ref 변수와 양방향 바인딩 -->
            <input type="text" v-model="userPw" />
          </td>
        </tr>
        <tr>
          <td>관리자 이름 :</td>
          <td>
            <!-- v-model로 userName ref 변수와 양방향 바인딩 -->
            <input type="text" v-model="userName" />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <!-- 폼 제출을 트리거하는 버튼 -->
      <button type="submit">등록</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AdminSetupFormComponent',
  // 부모에게 전달할 이벤트 목록 선언
  emits: ['register-admin'],

  setup(props, context) {
    // 반응형 변수들 선언 및 초기화
    const userId = ref('')    // 관리자 아이디
    const userPw = ref('')    // 관리자 비밀번호
    const userName = ref('')  // 관리자 이름

    // 폼 제출 시 실행되는 함수
    // event 매개변수는 @submit 이벤트에서 자동으로 전달되는 이벤트 객체
    const fireResgisterAdmin = (event) => {
      // 디버깅용 로그 (실제로는 사용하지 않음)
      console.log(event)
      
      // 부모 컴포넌트에게 'register-admin' 이벤트 발생
      // 두 번째 매개변수로 관리자 정보 객체를 전달
      context.emit('register-admin', {
        userId: userId.value,    
        userPw: userPw.value,
        userName: userName.value,
      })
    }

    // 템플릿에서 사용할 변수와 함수들을 반환
    return {
      userId,
      userPw,
      userName,
      fireResgisterAdmin,
    }
  },
}
</script>
```

---
---

# Default Export / Named Export

## Default Export
```js
// export
export default function add(a, b) {
  return a + b
}

// import
import add from './math.js'           
import myAdd from './math.js'         
import whatever from './math.js'     
```
- 모듈당 1개만 가능
- import시 중괄호가 없고 임의의 명칭으로 import 가능
- 모듈의 주요 기능을 export 할때 적합

## Named Export
```js
// export
export const formatDate = (date) => { ... }
export const formatCurrency = (amount) => { ... }
export const validateEmail = (email) => { ... }

// import
import { formatDate, formatCurrency } from './utils.js'
import { formatDate as format, validateEmail } from './utils.js'
```
- 모듈당 여러개 가능
- 중괄호가 있고, 원하는 모듈만 선택하여 import 가능


---
---
# 의존성 주입 provide / inject

## provide : 데이터 제공
```js
// 부모 컴포넌트에서
import { provide } from 'vue'

setup() {
  
  const { isAuthorized, myinfo, isAdmin, isMember, signin } = useAuth()
  
  // 전역적으로 제공할 데이터들을 등록 : provide('키', 값)
  provide('isAuthorized', isAuthorized)
  provide('myinfo', myinfo)
  provide('isAdmin', isAdmin)
  provide('isMember', isMember)
  provide('signin', signin)
}
```

## inject : 의존성 주입
```js
// 자식 컴포넌트에서
import { inject } from 'vue'

export default {
  setup() {
    // 부모 컴포넌트에서 제공한 데이터들을 주입받기 : inject('키')
    const isAuthorized = inject('isAuthorized')
    const myinfo = inject('myinfo')
    const signin = inject('signin')
    
    return {
      isAuthorized,
      myinfo,
      signin
    }
  }
}
```

---
---
# 데이터 바인딩 :value vs v-model
## :value (v-bind:value)
- 단방향 바인딩
- 데이터 변경 불가능
- 사용자의 입력이 데이터에 영향을 주지 않음

## v-model
- 양방향 바인딘
- 데이터 변경 가능
- 사용자 입력이 데이터를 변경하고, 데이터 변경이 input에 반영됨

---
---

# study_vue 기능별 라우터
- home.js : 홈
- auth.js : 로그인
- member.js : 회원 
- codegroup.js : 코드그룹

---
---
# vue.js 구현 방법

## Single File Component (SFC) 방식
- Vue CLI/Vite를 통해서 프로젝트 생성
- 완전한 SPA 구조
- 빌드 프로세스 필요 (Webpack, Vite 등)
- 컴포넌트 기반 (.vue)
- 라우팅, 상태관리 등 Vue 생태계 활용 (Router, Pinia 등)

## CDN 방식
- 구성된 웹페이지에 CDN을 이용하여 일부만 Vue 적용
- 빌드 프로세스 불필요
- 프로토타이핑에 적합