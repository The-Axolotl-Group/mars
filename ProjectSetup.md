CREATE ROOT FOLDER
1/ mdkdir doo -> cd doo -> code .

VITE
2/ npm create vite@latest client -- --template react-ts;
-> cd client -> npm install, npm run dev
-> npm i react-router-dom, typescript, @types/

SERVER
3/ mkdir ../server && cd ../server
-> npm init -y
-> npm i express mongoose dotenv cors
-> npm i -D typescript ts-node-dev @types/node @types/express

4/ CREATE server/src/server.ts

- WATCH THIS: https://www.youtube.com/watch?v=Be7X6QJusJA
  4.1/
  -> cd server && mkdir src && cd src && code server.ts
  -> go to back to server folder (ROOT directory) and run "npx tsc --init --rootDir src --outDir dist --esModuleInterop"
  ---> This creates tsconfig.json and sets rootDir to be src and outDir to be dist
  ---> Whenever we're gonna run build this is going to transpile the code from SRC to DIST
  -----> If inside tsconfig.json you're getting an error, change the "rootDir" to -> "rootDir": "."
  ---> npx tsc --build
  ---> node ./dist/index.js

  4.2/ navigate to package.json (inside the server folder) (Video at 15:40)
  -> "scripts": { "build": "tsc --build" }
  -> "scripts": { "start": "node ./dist/index.js" }
  -> "dev": "ts-node-dev --respawn src/server.ts"
  ---> This starts your TS server, watches the files for changes, restarts the server automatically whenever you save changes without COMPILING
  ---> --respawn makes crash recovery cleaner (properly restarts the child process if your code crashes)
  -> "start:dev": "nodemon ./src/server.ts"

5/ Navigate to the root folder of your project
-> "npm init -y" to create package.json
-> "npm i concurrently"
-> "dev": "concurrently -k \"npm run dev --prefix server\" \"npm run dev --prefix client\"",
-> "build": "npm run build --prefix server && npm run build --prefix client",

6/ CREATE PROXY: Navigate to client/vite.config.ts && add a proxy port that will be shared across both backend & frontend:
-> server: { proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true, secure: false, },},},

7/ Navigate back to the ./server/server.ts
-> import all important modules
--> import dotenv -> code .env inside server folder
--> import express (+ Request, Response)
---> const app = express();
--> import path
--> create an apiRouter (optional)
---> mkdir routes inside server folder -> cd routes && code api.ts -> cd api.ts
----> import { Router} from express -> const apiRouter = router(); -> export default apiRouter;
-> fire up the server

8/ Create .env inside server and .env inside client
-> create .gitignore as well and add there .env

9/ Create your model.ts
-> connect to the mongoDB
-> install mongoose and wire it up

10/ MONGODB + MONGOOSE
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
