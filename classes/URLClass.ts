abstract class URLCLass {
    constructor() {
        if (new.target === URLCLass) {
            throw new Error("URLClass cannot be instantiated directly.");
        }
    }

    abstract generate(...args: any): URL;
}

export default URLCLass;
