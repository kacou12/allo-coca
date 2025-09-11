<div align="center">
<a href="https://vuejs.org/" target="blank" style="margin: 0 1rem;"><img src="https://router.vuejs.org/logo.svg" width="80" alt="Vue Logo" /></a>
<a href="https://www.typescriptlang.org/" target="blank" style="margin: 0 1rem;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png?20210506173343" width="80" alt="Typescript Logo" /></a>
<a href="https://vitejs.dev/" target="blank" style="margin: 0 1rem;"><img src="https://vitejs.dev/logo.svg" width="80" alt="Vite 3 Logo" /></a>
<a href="https://pinia.vuejs.org/" target="blank" style="margin: 0 1rem;"><img src="https://pinia.vuejs.org/logo.svg" width="50" alt="Pinia Logo" /></a>

<br><br>

<h1>✨ Paytic Dashboard Merchant ✨</h1>
</div>

A dashboard for Paytic merchants built with Vue v3, Typescript, Vite, Vue Router, Pinia, Axios, Tailwind CSS, Vue Query, VeeValidate, and Zod to create an efficient, fast, maintainable, and scalable application.

### 📚 Table of Contents

- [❓ What's Included?](#-whats-included)
- [🖇️ Core Dependencies](#️-core-dependencies)
- [🗂️ Project Structure](#️-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💡 Scripts](#-scripts)
- [📝 License](#-license)

## ❓ What's Included?

- [x] Authentication: Provides a secure login system for users.
- [x] Authorization: Implements role-based access control to manage user permissions.
- [x] Form Validation: Includes form validation functionality to ensure data integrity and improve user experience.
- [x] Error Handling: Handles and displays error messages in a user-friendly manner.
- [x] API Integration: Integrates with external APIs to fetch data and provide dynamic content.
- [ ] Theme (Light/Dark/System): Offers a choice of light, dark, or system-based theme for a personalized user experience.
- [ ] Responsive Design: Ensures the application is optimized for various screen sizes and devices.
- [ ] Testing: Includes a test suite with unit tests and integration tests for reliable code quality.
- [ ] Documentation: Provides comprehensive documentation to guide developers and users.

## 🖇️ Core Dependencies

[&#8593; Back to top](#-table-of-contents)

| Library      | Version                                                                  | Description                                                                                        |
| ------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Vue          | ![Vue](https://img.shields.io/badge/%5E3.5.12-blue.svg)                  | A progressive JavaScript framework for building user interfaces.                                   |
| Vite         | ![Vite](https://img.shields.io/badge/%5E5.4.9-blue.svg)                  | Next-generation frontend build tooling for fast and efficient development.                         |
| Typescript   | ![Typescript](https://img.shields.io/badge/%5E5.6.3-blue.svg)            | A superset of JavaScript that enhances the development experience with static typing.              |
| Vue Router   | ![Vue Router](https://img.shields.io/badge/%5E4.4.5-blue.svg)            | Official router for Vue.js, used for managing application routes.                                  |
| Vue Query    | ![@tanstack/vue-query](https://img.shields.io/badge/%5E5.59.13-blue.svg) | A data-fetching and state management library for Vue.js, with powerful data-fetching capabilities. |
| Pinia        | ![Pinia](https://img.shields.io/badge/%5E2.2.4-blue.svg)                 | An intuitive store for Vue.js applications, providing centralized state management.                |
| Axios        | ![Axios](https://img.shields.io/badge/%5E1.7.7-blue.svg)                 | Promise-based HTTP client for making API requests.                                                 |
| Tailwind CSS | ![Tailwind CSS](https://img.shields.io/badge/%5E3.4.14-blue.svg)         | A highly customizable CSS framework for rapid web development.                                     |
| VeeValidate  | ![VeeValidate](https://img.shields.io/badge/%5E4.14.3-blue.svg)          | Painless Vue form.                                                                                 |
| Zod          | ![Zod](https://img.shields.io/badge/%5E3.23.8-blue.svg)                  | TypeScript-first schema validation with static type inference.                                     |

## 🗂️ Project Structure

```
.
├── public/
│   └── ...
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── assets/
│   ├── components/
│   │   ├── custom-shadcn/
│   │   ├── dropdowns/
│   │   ├── layouts/
│   │   ├── main/
│   │   ├── modals/
│   │   ├── skeletons/
│   │   ├── svg/
│   │   ├── ui/
│   │   ├── users/
│   │   └── vee-validate/
│   ├── composables/
│   │   └── queries/
    ├── config/
│   │   ├── axios.ts
│   │   ├── env.ts
│   ├── constants/
│   ├── interfaces/
│   ├── lib/
│   ├── locales/
│   ├── mocks/
│   ├── router/
│   ├── services/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── keys/
│   │   ├── merchant-request/
│   │   ├── merchants/
│   │   ├── providers/
│   │   ├── switch-aggregators/
│   │   ├── transactions/
│   │   └── webhook/
│   ├── shared/
│   ├── stores/
│   ├── types/
│   └── views/
│       ├── administration/
│       ├── apiKeys/
│       ├── collected/
│       ├── guests/
│       ├── security/
│       ├── transactions/
│       ├── transfered/
│       └── wallets/
├── .env.example
├── package.json
└── ...
```

## 🚀 Getting Started

### Prerequisites

[&#8593; Back to top](#-table-of-contents)

1. [Node Js](https://nodejs.org/en/) version `v20+`. The current Long Term Support (LTS) release is an ideal starting point.
2. [Visual Studio Code](https://code.visualstudio.com/download). Visual Studio Code is the free and open-sourced code editor. It is one of the top most editor used especially for JavaScript application development.

   **Recommended Plugin for VSCode**

   - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
   - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
   - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
   - [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
   - [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

### Installation

[&#8593; Back to top](#-table-of-contents)

1.  Clone this repository to your computer.

2.  From the project's root directory, install the required packages (dependencies):

    ```sh
    yarn install
    ```

3.  Create environment files:

    ```sh
    cp .env.example .env
    ```

4.  Set up the environment variables in the `.env` file.

5.  To run the app on your local machine:

    ```sh
    yarn dev
    ```

6.  To build for production:

    ```sh
    yarn build
    ```

## 💡 Scripts

[&#8593; Back to top](#-table-of-contents)

The following scripts are available:

| Script         | Action                                                             |
| -------------- | ------------------------------------------------------------------ |
| `yarn install` | Installs the project dependencies.                                 |
| `yarn dev`     | Runs the application in development mode.                          |
| `yarn serve`   | Runs both the Vite dev server and the backend server concurrently. |
| `yarn build`   | Builds the production-ready optimized bundle.                      |
| `yarn preview` | Starts the preview server using Vite.                              |
| `yarn lint`    | Runs ESLint to lint the project files and fix any issues.          |
| `yarn format`  | Formats the source code using Prettier.                            |

## 📝 License

This project is licensed under the [MIT](./LICENSE) License.
