CREATE ROOT FOLDER
1/ mdkdir doo -> cd doo -> code.

VITE
2/ npm create vite@latest client -- --template react-ts;
3/ cd client -> npm install, npm run dev

SERVER
4/ mkdir ../server && cd ../server
-> npm init -y
-> npm i express mongoose dotenv corse
-> npm i -D typescript ts-node-dev @types/node @types/express

5/ CREATE server/src/server.ts

- WATCH THIS: https://www.youtube.com/watch?v=Be7X6QJusJA
  -> cd server && mkdir src && cd src && code server.ts
  -> go to server folder and run "npx tsc --init --rootDir src --outDir dist --esModuleInterop"
  ---> This creates tsconfig.json and sets rootDir to be src and outDir to be dist
  ---> Whenever we're gonna run build this is going to transpile the code from SRC to DIST
  ---> npx tsc --build
  ---> node ./dist/index.js

  5.1/ navigate to package.json (15:40)
  -> "scripts": { "build": "tsc --build" }
  -> "scripts": { "start": "node ./disdt/index.js" }

6/ Start server.ts inside server folder
-> import all important modules
-> fire up the server

7/ Create your model.ts
-> connect to the mongoDB
-> install mongoose and wire it up

8/ CREATE PROXY
-> Go to vite.config.js and add server: { proxy: { './api': 'http://localhost:3000' }}

8/ Create .env inside server and .env inside client
-> create .gitignore as well and add there .env

9/ MONGODB + MONGOOSE
-> Create new project -> new cluster -> generate connection string
-> Connect via the extension + store the MONGO_URI inside your .env variables

**_CHECKLIST_**
-> Make sure you have 3 package.json files (global, server, client)
-> Install respective dependencies inside each
-> global - concurrently
-> client - react-router-dom, typescript, @types/
-> server - mongoose express cors dotenv nodemon

**_Commands_**
npm run dev in server/ = hot‑reloading Express (+ Mongoose soon).
npm run dev in client/ = Vite React dev server with proxy.
npm run dev at the root (with the scripts above) runs both.

10/ CONNECT OPENAI
-> npm install openai
->
