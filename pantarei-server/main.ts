import { Server } from "./models/server.model";

function main() {
    const server = new Server(3000);
    server.listen();
}

main();