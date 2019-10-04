import { log } from "./logger.js";
import { app } from "./app.js";
// import { routine } from "./stub-instructions.js";

const namespace = 'urn:x-cast:cast-your-instructions';

app.setListener({
    onLoad: function (routine) {
        const message = {
            type: 'LOADED',
            routine: routine
        };
        this.sendMessage(message);
    },
    onPlay: function (routine) {
        const message = {
            type: 'PLAYED',
            routine: routine
        };
        this.sendMessage(message);
    },
    onPause: function (routine) {
        const message = {
            type: 'PAUSED',
            routine: routine
        };
        this.sendMessage(message);
    },
    onStop: function (routine) {
        const message = {
            type: 'STOPPED',
            routine: routine
        };
        this.sendMessage(message);
    },
    onSelectedInstruction: function (routine, selectedInstructionIndex) {
        const message = {
            type: 'SELECTED_INSTRUCTION',
            routine: routine,
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
    const routine = event.data.routine;

    switch (type) {
        case 'LOAD':
            app.load(routine);
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