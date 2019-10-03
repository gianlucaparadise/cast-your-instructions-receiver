import { log } from "./logger.js";
import { app } from "./app.js";
// import { recipe } from "./stub-instructions.js";

const namespace = 'urn:x-cast:cast-your-instructions';

app.setListener({
    onLoad: function (recipe) {
        const message = {
            type: 'LOADED',
            recipe: recipe
        };
        this.sendMessage(message);
    },
    onPlay: function (recipe) {
        const message = {
            type: 'PLAYED',
            recipe: recipe
        };
        this.sendMessage(message);
    },
    onPause: function (recipe) {
        const message = {
            type: 'PAUSED',
            recipe: recipe
        };
        this.sendMessage(message);
    },
    onStop: function (recipe) {
        const message = {
            type: 'STOPPED',
            recipe: recipe
        };
        this.sendMessage(message);
    },
    onSelectedInstruction: function (recipe, selectedInstructionIndex) {
        const message = {
            type: 'SELECTED_INSTRUCTION',
            recipe: recipe,
            selectedInstructionIndex: selectedInstructionIndex
        };
        this.sendMessage(message);
    },
    sendMessage: function (message) {
        log(() => `Sending message: ${message.type}`);
        const senderId = undefined; // this broadcasts to all connected devices
        context.sendCustomMessage(namespace, senderId, message);
    }
});

const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener(namespace, event => {
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