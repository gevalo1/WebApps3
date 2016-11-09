const express = require('express');

import { UserRoutes } from '../../auth/';
//TODO routes toevoegen hier

const app = express();

class BaseRoutes {
    get routes() {
        
        app.use(new UserRoutes.routes);
        
        return app;
    }
}
export { BaseRoutes };