import { Router } from 'express';
import { TodoController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { TodoService } from '../services/todo.service';





export class TodoRoutes {


  static get routes(): Router {

    const router = Router();
    const todoService = new TodoService();
    const controller = new TodoController(todoService);

    router.get('/', controller.getTodos);
    router.post('/',[ AuthMiddleware.validateJWT ] ,controller.createTodo);

    return router;
  }


}

