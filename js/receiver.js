import { log } from "./logger.js";
import { app } from "./app.js";
import { recipe } from "./stub-instructions.js";

const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener('urn:x-cast:cast-your-instructions', event => {
    log(() => 'CustomMessage: ');
    log(() => event);
    const recipe = event.data;
    app.start(recipe);
});

context.start();