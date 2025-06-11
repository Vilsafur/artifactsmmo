import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("debug", {
    alias: "d",
    type: "boolean",
    description: "Activer le mode debug",
    default: false
  })
  .parseSync();

export default {
  debug: argv.debug
};
