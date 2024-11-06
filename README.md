<p align="center">
  <a href="https://github.com/renchris/panda-boilerplate">
    <img alt="Project Logo" src="public/tailwind.png" width="60" />
  </a>
</p>
<h1 align="center">
  Project Gutenberg Explorer
</h1>

A web application that allows users to explore books from Project Gutenberg using Next.js, TypeScript, and Tailwind CSS.

## 🚀 Technical Stack

### ⏭️ NextJS App Router
We chose **Next.JS** App Router in Next.js allows us to build applications using React's latest features, including:

- **Server Components**: This feature enables us to render components on the server, improving performance.
- **File-based Routing**: Simplifies the creation of routes based on the file structure, making it intuitive to manage pages.

### 🔤 TypeScript
**TypeScript** is used to add static typing to our JavaScript code, which helps catch errors early in the development process and improves code maintainability.

### 🌬️ Tailwind CSS
We opted for **Tailwind CSS** as our styling framework due to it being the desired UI framework and having zero-runtime JS-in-CSS to be compatible with React Server Components.

### ☁️ AWS Amplify
**AWS Amplify** is used for hosting our application for one-click deployment connected to our GitHub repository. 

### ☔ DrizzleORM
We utilize **DrizzleORM** as our Object-Relational Mapping (ORM) tool, which facilitates the interaction between TypeScript and SQL databases. It simplifies database operations and enhances type safety in our application without significantly abstracting farther away from SQL.

### 🌊 SQLite and Turso LibSQL
For local development, we use **SQLite** as our database, which is lightweight and easy to set up. In production, we leverage **Turso LibSQL**, a cloud-native SQL database that provides scalability and performance with more available and concise availability zones.

### ✨ Groq
**Groq** is integrated into our application for leveraging Large Language Models (LLMs). It allows us to perform advanced text analysis and natural language processing tasks, enhancing the user experience.

### 📦 Component Libraries
We incorporate several component libraries to speed up our UI development:
- **Shadcn**
- **Aceternity**
- **Tailwind UI**

## 📁 Project Hierarchy

A quick look at the top-level files and directories where we made our feature changes in the project:

```
src
└── app
    ├── layout.tsx
    ├── page.tsx
    ├── components
    │   ├── InputSection.tsx
    │   ├── BookDetails.tsx
    │   ├── AnalyzeTextPage.tsx
    │   └── BooksGrid.tsx
    └── styles
        └── globals.css
eslintrc.js
```

1. **`/src/app`**: This directory contains all the code related to the front-end of the site. The `src` folder is a convention for “source code,” and `app` is the convention for the “app router.”

2. **`src/app/layout.tsx`**: This file contains the Root Layout. The JSX elements in this file apply to all routes, with routes being `{children}`. See [Next.js Documentation: Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts).

3. **`src/app/page.tsx`**: This file contains the code for the front-end page. See [Next.js Documentation: Pages](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages).

4. **`src/app/components`**: This directory contains reusable components used throughout the application, such as:
   - **`InputSection.tsx`**: Handles user input and error messages.
   - **`BookDetails.tsx`**: Displays book metadata and content.
   - **`AnalyzeTextPage.tsx`**: Manages the text analysis functionality.
   - **`BooksGrid.tsx`**: Displays a grid of existing books.

5. **`src/styles/globals.css`**: This file contains global styles for the application.

6. **`eslintrc.js`**: This file contains the ESLint rule configuration to maintain code quality and consistency.

## 🎨 Code Style

We use **ESLint** for our code style. You may modify the ESLint rule set in the `.eslintrc.js` file. Include ESLint On Save in your code editor Preferences settings.

```JSON
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

See
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Airbnb ESLint Style Guide](https://github.com/airbnb/javascript)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)

## 🚀 Usage

First, install the dependencies:

```bash
pnpm install
```

Then, initialize the local database:

```bash
pnpm generate
pnpm migrate
```

Then, run the application:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📝 Conclusion

This project serves as an example application with Next.js, TypeScript, and Tailwind CSS to display, save, and analyze books from the Project Gutenberg Library.