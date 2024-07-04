export class Todo {
    constructor() {
        this.todo_id = 0;
        this.state = 'Todo';
        this.title = '';
        this.description = '';
        this.priority = '';
        this.author = '';
        this.date = '';
        this.dateline = new Date();
        this.subtask = '';
    }

    todo_id: number;
    title: string;
    description: string;
    date: string;
    priority: string;
    author: string;
    state: string;
    dateline: Date;
    subtask: string;
}