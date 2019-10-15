import { log } from "./logger.js";
import { app as view } from "./app.js";
// import { routine as stubbedRoutine } from "./stub-instructions.js";

let appState = 'IDLE';

const namespace = 'urn:x-cast:cast-your-instructions';

const appMessenger = {
    onSendState: function (type, routine, senderId = null) {

        // States are: 'LOADED', 'PLAYED', 'PAUSED', 'STOPPED'
        appState = type;

        const message = {
            type: type,
            routine: routine
        };

        this.sendMessage(message, senderId);
    },
    onSelectedInstruction: function (routine, selectedInstructionIndex) {
        const message = {
            type: 'SELECTED_INSTRUCTION',
            routine: routine,
            selectedInstructionIndex: selectedInstructionIndex
        };
        this.sendMessage(message);
    },
    sendMessage: function (message, senderId) {
        log(() => `Sending message: ${message.type}`);
        senderId = !senderId ? undefined : senderId; // When senderId is undefined, this broadcasts to all connected devices
        context.sendCustomMessage(namespace, senderId, message);
    }
};

view.setListener(appMessenger);

const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener(namespace, event => {
    log(() => 'CustomMessage: ');
    log(() => event);
    const type = event.data.type;
    const routine = event.data.routine;

    switch (type) {
        case 'LOAD':
            view.load(routine);
            break;

        case 'PLAY':
            view.play();
            break;

        case 'PAUSE':
            view.pause();
            break;

        case 'STOP':
            view.stop();
            break;

        default:
            break;
    }

});

context.addEventListener([
    // system.EventType.READY, system.EventType.SHUTDOWN, system.EventType.SENDER_DISCONNECTED, system.EventType.ERROR, system.EventType.SYSTEM_VOLUME_CHANGED, system.EventType.VISIBILITY_CHANGED, system.EventType.STANDBY_CHANGED, system.EventType.FEEDBACK_STARTED,
    cast.framework.system.EventType.SENDER_CONNECTED
], (e) => {
    log(() => `Event`);
    log(() => e);
    if (e.type === cast.framework.system.EventType.SENDER_CONNECTED) {
        log(() => `SENDER_CONNECTED: ${e.senderId}`);
        const routine = view.state.routine;

        setTimeout(() => {
            log(() => `SENDER_CONNECTED: Sending current state to connected device`);
            appMessenger.onSendState(appState, routine, e.senderId)
        }, 1000);
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

// // This is to test locally
// setTimeout(() => view.load(stubbedRoutine), 5000);