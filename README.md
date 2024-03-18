# honox-blog-template

This is a template repository that allows you to easily create a blog site using [HonoX](https://github.com/honojs/honox).

## Technology Stack

- [HonoX](https://github.com/honojs/honox): HonoX is a simple and fast supersonic meta-framework for creating full-stack websites and web APIs. It is built on top of Hono, Vite, and a UI library.
- [Biome](https://github.com/biomejs/biome): Biome is a performant toolchain for web projects, aimed at providing developer tools to maintain the health of the project.
- [highlight.js](https://highlightjs.org/): Highlight.js is a syntax highlighter written in JavaScript. It works on both the browser and the server, operates with most markup, is independent of other frameworks, and has automatic language detection.
- [tailwindcss](https://v2.tailwindcss.com/): A utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90, which allows you to apply any design directly within your markup.

## Example

- https://github.com/yossydev/blog

## Getting Started

This section explains how to set up your environment for local development and how to start writing your blog.

### Installing

```
$ npm install
```

Note that this step does not necessarily have to be done with npm; you may use other package managers like bun or pnpm.

## Starting the App

### Local Environment

```
$ npm run dev
$ open http://localhost:5173/
```

### Production Environment

```
$ npm run build
$ npm run preview
$ b // open a brower
```

## Writing a Blog

Answering three questions will automatically generate an mdx file, making it easier to start writing your blog.

```
$ npm run create:post
```

![Running npm run create:post](https://github.com/yossydev/blog/assets/87469023/b110f12e-191b-4657-b729-34b7a8cf3a3e)
