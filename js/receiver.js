import { log } from "./logger.js";
import { app } from "./app.js";
// import { recipe } from "./stub-instructions.js";

const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener('urn:x-cast:cast-your-instructions', event => {
    log(() => 'CustomMessage: ');
    log(() => event);
    const type = event.data.type;
    const recipe = event.data.recipe;

    switch (type) {
        case 'LOAD':
            app.load(recipe);
            break;

        case 'PLAY':
            app.play();
            break;

        case 'PAUSE':
            app.pause();
            break;

        case 'STOP':
            app.stop();
            break;

        default:
            break;
    }

});

const playerManager = context.getPlayerManager();

// Listen and log all Core Events.
playerManager.addEventListener(cast.framework.events.category.CORE,
    event => {
        console.log("Core event: " + event.type);
        console.log(event);
    }
);

playerManager.addEventListener(
    cast.framework.events.EventType.MEDIA_STATUS, (event) => {
        console.log("MEDIA_STATUS event: " + event.type);
        console.log(event);
    }
);

context.start();