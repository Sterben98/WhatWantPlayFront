import { Game } from "../../games/model/game";


export interface Console{
    id:number;
    version:number;
    name:string;
    games?: Array<Game>
}