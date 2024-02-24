import express, { Application } from 'express';
import cors from 'cors';

export class Server {
    private port?: number;
    private app: Application;

    constructor(port?: number) {
        this.port = port;
        this.app = express();
        this.settings();
    }

    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server listening on port ${this.app.get("port")}`);
        })
    }

}