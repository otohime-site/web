### The Otohime front-end

It is a TypeScript / React project, serving the [Otohime](https://otohi.me/) front-end
and the [bookmarklet](https://otohi.me/go.js) to trigger the update.

#### Get Started

Register and set:

- Firebase Auth connecting with Google

Make sure the server is up with `docker-compose` and `.env` set correctly.
In order to import the score correctly, please check documents of the server.

Then create `src/firebase.ts` with contents like:

```ts
export default {
  apiKey: ".......",
  authDomain: "project-name.firebaseapp.com",
  databaseURL: "https://project-name.firebaseio.com",
  projectId: "project-name",
  storageBucket: "project-name.appspot.com",
  messagingSenderId: "............",
  appId: ".........",
  measurementId: ".....",
}
```

Install the dependencies:

```
npm install
```

Run the dev server with:

```
npm start
```

Firebase Auth requires HTTPS, so the dev server is set to use HTTPS by default.
If you have the server Docker Compose Project running at the same machine, the whole site should work out of the box.

#### What's used?

- [urql](https://github.com/urql-graphql/urql) and [gql.tada](https://gql-tada.0no.co/) for GraphQL
  The gql.tada TypeScript generation should work when server Docker Compose is running.
- [Ark UI](https://ark-ui.com/) - Providing Headless React Components
- [Open Props](https://open-props.style/) for CSS Styling

##### Bookmarklet

Bookmarklet is a long story, basically, it will use the `src/go.js` as the entry, injecting an `<iframe>` (for live-loading and style resets) loading `src/bookmarklet/entry.tsx`, and use `window.parent` to fetch the scores to bypass most CORS issues.

`go.js` has some development addition, so live reloading shall work with the Dev Server. (it may be changed after Vite updates)

### License

Copyright (c) 2018 - 2025 Otohime Team (Hsiao-Ting Yu and others)

Licensed under MIT license, see LICENSE.md.

Artworks in `public/favicon.ico`, `src/logo`, `src/dx_intl/images/course_ranks` and `src/dx_intl/images/class_ranks`, `src/dx_intl/images/ratings` are released separately:

(C) 2021-2023 Akanyan, released under [CC-BY 4.0 International](https://creativecommons.org/licenses/by/4.0/)

Logos are generated with [RealFaviconGenerator.net](https://realfavicongenerator.net/).
