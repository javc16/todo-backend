import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { TodoRoutes } from './todo/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Routes
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/todo', TodoRoutes.routes );



    return router;
  }


}

