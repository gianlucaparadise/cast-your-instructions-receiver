import { log } from "./logger.js";
import { app } from "./app.js";
import { recipe } from "./stub-instructions.js";

setTimeout(() => app.start(recipe), 2000);