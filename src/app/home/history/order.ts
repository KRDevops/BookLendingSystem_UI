import { User } from 'src/app/login/user';
import { Book } from '../book';

export class Order {
    transactionId: number;
    transactionType: string;
    transactionDate: Date;
    userId: User;
    bookId: Book;
}
