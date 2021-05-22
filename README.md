### The Otohime front-end

It is a TypeScript / React project.

#### Get Started

Register and set:

- Facebook Login
- Firebase Auth connecting with Facebook

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
