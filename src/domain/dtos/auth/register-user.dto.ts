import { regularExps } from "../../../config";

export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ){

    }

    static create( object: { [key:string]: any } ): [string?, RegisterUserDto?] {

        const {name, email, password} = object;

        if( !name ) return ['Mising name', undefined];
        
        if( !email ) return ['Mising email', undefined];

        if( !regularExps.email.test ( email ) ) return ['Email is not valid', undefined];
        
        if( !password ) return ['Mising password', undefined];

        if( password.length < 6 ) return ['Password too short', undefined]; 

        return [undefined, new RegisterUserDto(name, email, password)];
 
    }
}