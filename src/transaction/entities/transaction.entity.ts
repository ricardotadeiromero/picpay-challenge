import { User } from "src/user/entities/user";

export class Transaction {
    id: number;
    amount: number;
    sender: User;
    receiver: User;
    timestamp: Date;
    constructor(partial: Partial<Transaction>) {
        Object.assign(this, partial);
    }
}
