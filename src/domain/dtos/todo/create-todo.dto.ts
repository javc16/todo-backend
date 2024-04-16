export class CreateTodoDto {

    private constructor(
        public readonly name: string,
    ){

    }

    static create(object: {[key:string]:any}): [string?, CreateTodoDto?] {
        const {name} = object;
        if( !name) return ['Missing name'];

        return [undefined, new CreateTodoDto(name)];
    }
}