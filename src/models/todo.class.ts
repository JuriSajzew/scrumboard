export class Todo {
    constructor() {
        this.state = 'Todo';
        this.title = '';
        this.description = '';
        this.priority = '';
        this.author = '';
        this.date = '';
        this.dateline = new Date();
    }

    title: string;
    description: string;
    date: string;
    priority: string;
    author: string;
    state: string;
    dateline: Date;
}