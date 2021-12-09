import { Console } from "@angular/compiler/src/util";

export interface Game{
    id:number;
    version:number;
    title:string;
    description: string;
    vote:number;
    consoles?: Array<Console>
}