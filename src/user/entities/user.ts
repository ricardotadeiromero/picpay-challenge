export enum UserType {
    marchant = 'marchant',
    commom = 'commom'
}

export class User {

    id: number;
    firstName: string;
    lastName: string;
    document: string;
    email:string;
    password:string;
    type: UserType | string;
    balance: number;
}