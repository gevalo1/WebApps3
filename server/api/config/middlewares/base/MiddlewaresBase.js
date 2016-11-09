const express = require('express');

const BaseRoutes = require('../../routes/BaseRoutes');

class MiddlewaresBase {
    static get configuration () {
         const app = express();

         app.use(new BaseRoutes().routes);

         return app;
    }
}

Object.seal(MiddlewaresBase);
export { MiddlewaresBase as Middlewares };