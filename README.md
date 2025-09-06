# study_vue Setting

This template should help get you started developing with Vue 3 in Vite.

## version
node : 22

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