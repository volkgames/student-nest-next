import "dotenv/config";

import { pg } from "./index";

async function main() {
    
  await pg.end();
}

main();