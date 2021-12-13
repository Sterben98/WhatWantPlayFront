export interface User{
    firstName:string;
    lastName:string;
    username:string;
    password:string;

    roles?: Array<string>;
}