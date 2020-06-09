'use strict';


//---------//
// Imports //
//---------//

const Koa = require('koa')
  , sqliteToRest = require('.');


//------//
// Init //
//------//

const dbPath = process.env.DB_PATH
  , getSqliteRouter = sqliteToRest.getSqliteRouter
  , PORT = 8080;


//------//
// Main //
//------//

const app = new Koa();

getSqliteRouter({ dbPath })
  .then(router => {
    app.use(router.routes())
      .use(router.allowedMethods())
      .listen(PORT);

    console.log(`Listening on port: ${PORT}`);
  });
