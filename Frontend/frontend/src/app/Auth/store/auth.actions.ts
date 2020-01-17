import {Action} from "@ngrx/store";
export const ADD_USER='ADD_USER';
export const REMOVE_USER='REMOVE_USER';
export class AddUser{
    readonly type=ADD_USER; 
    constructor(public payload){

    }
}
export class RemoveUser{
    readonly type=REMOVE_USER; 
    constructor(){

    }
}
export type AuthUserActions=AddUser|RemoveUser;