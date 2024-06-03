export class Todo {
    constructor() {
        this.state = 'Todo';
        this.title = '';
        this.description = '';
        this.member = '';
    }

    title: string;
    description: string;
    date: number | undefined;
    member: string;
    state: string;
}