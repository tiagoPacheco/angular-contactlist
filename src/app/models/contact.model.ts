export class Contact {
    _id?: string;
    name: string;
    phone: string;

    constructor(name: string, phone: string) {
        this.name = name;
        this.phone = phone;
    }
}
