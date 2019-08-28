import * as primeNg from "primeng/api";

export class Message implements primeNg.Message {

    constructor(public severity: string, public summary: string, public detail: string) {
    }

    static Success(detail: string, summary?: string): primeNg.Message {
        return new Message('success', summary || 'Success', detail);
    }

    static Error(detail: string, summary?: string): primeNg.Message {
        return new Message('error', summary || 'Error', detail);
    }

    static Info(detail: string, summary?: string): Message {
        return new Message('info', summary || 'Info', detail);
    }

    static Warning(detail: string, summary?: string): primeNg.Message {
        return new Message('warn', summary || 'Warning', detail);
    }

}