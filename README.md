### The Otohime front-end

It is a TypeScript / React project.

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

### License

Copyright (c) 2018 - 2025 Otohime Team (Hsiao-Ting Yu and others)

Licensed under MIT license, see LICENSE.md.

Artworks in `public/favicon.ico`, `src/logo`, `src/dx_intl/images/course_ranks` and `src/dx_intl/images/class_ranks`, `src/dx_intl/images/ratings` are released separately:

(C) 2021-2023 Akanyan, released under [CC-BY 4.0 International](https://creativecommons.org/licenses/by/4.0/)

Logos are generated with [RealFaviconGenerator.net](https://realfavicongenerator.net/).
