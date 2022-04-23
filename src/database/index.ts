import { createConnection } from "typeorm";

createConnection().catch(error => console.log(error));