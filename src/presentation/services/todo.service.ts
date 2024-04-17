import { TodoModel } from "../../data";
import { CreateTodoDto, CustomError, PaginationDto, UserEntity } from "../../domain";




export class TodoService{
    constructor(){}

    async createTodo( createTodoDto: CreateTodoDto, user: UserEntity) {
        const todotExists = await TodoModel.findOne({ name: createTodoDto.name});
        if( todotExists ) throw CustomError.badRequest('Todo already exists!');

        try{
            const todo = new TodoModel({
                ...createTodoDto,
                user:user.id,
            })

            await todo.save();

            return {
                id: todo.id,
                name: todo.name,
                isComplete: todo.isComplete,
            }
        }catch(error){
            throw CustomError.internalServer(`${ error }`);
        }
    }

    async getTodos(paginationDto: PaginationDto) {

        const { page , limit } = paginationDto;

        try{
            const [total, todos] = await Promise.all([
                TodoModel.countDocuments(),
                TodoModel.find()
                .skip( (page-1) * limit)
                .limit(limit)
            ])
            // const todos = await TodoModel.find()
            // .skip( (page-1) * limit)
            // .limit(limit);

            return {
                page:page,
                limit: limit,
                total: total,
                next: `/api/todo?page=${ (page+1) }&limit=${ (limit) }`,
                prev: (page - 1 > 0)?`/api/todo?page=${ (page-1) }&limit=${ (limit) }`:null,

                todos:todos.map( todo => ({
                    id: todo.id,
                    name: todo.name,
                    isComplete: todo.isComplete,
                })),
            }
        }catch(error){
            throw CustomError.internalServer(`${error}`);
        }
    }
}