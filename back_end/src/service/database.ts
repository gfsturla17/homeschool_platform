import { createConnection } from "typeorm";

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "postgres",
    entities: [
        "./src/entity/**/*.ts"
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // Here you can start to work with your entities
}).catch(error => console.log(error));

