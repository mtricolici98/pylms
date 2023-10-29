export class User {

    email: string;
    name?: string;

    constructor(email: string, name: string | null = null) {
        this.email = email;
        this.name = name || this.email;
    }

}