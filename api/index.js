import startServer from "./src/server.js";
import keys from "./src/config/keys.js";
console.log(keys.PORT)
const PORT = keys.PORT;

startServer(PORT);

export default 'Working";
