import "dotenv/config";

import { database, pg } from "./index";

async function main() {
    
  await pg.end();
}

main();