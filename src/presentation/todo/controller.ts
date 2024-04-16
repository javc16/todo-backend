import { Request, Response} from 'express';
import { CreateTodoDto, CustomError, PaginationDto} from '../../domain';
import { TodoService } from '../services/todo.service';




export class TodoController {

    constructor(
        private readonly todoService: TodoService
    ){}

    private handleError = ( error: unknown, res: Response ) =>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }
        
        console.log(`${error}`);
        return res.status(500).json({ error:'Internal server error'})
    }

    createTodo = async(req: Request, res: Response) =>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if( error ) return res.status(400).json({ error});
        
        this.todoService.createTodo(createTodoDto!, req.body.user)
        .then(todo => res.status(201).json( todo ))
        .catch(error => this.handleError(error, res));
    }

    getTodos = async(req: Request, res: Response) =>{
        const { page=1 , limit=10 } = req.body;
        const [ error, paginationDto ] = PaginationDto.create( page,limit );
        if( error ) return res.status(400).json({ error});


        this.todoService.getTodos(paginationDto!)
        .then(todos => res.json(todos))
        .catch( error => this.handleError(error, res) );
    }

}