export class ApiFeedBackMessage {
    constructor(
        public title: string,
        public body: string,
    ) {}

    resolveFrontMessage() {
        return {
            title: this.title,
            body: this.body,
        }
    }
}
