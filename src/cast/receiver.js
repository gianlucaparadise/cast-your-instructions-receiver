/* global cast */ // this directive is for eslint

import "../types"
import "../components/instructions/types"
import { log } from "../logger.js";

/**
 * Payload of custom message sent to the sender
 * @typedef MessagePayload
 * @property {(PresentationState|"SELECTED_INSTRUCTION")} type Type of message
 * @property {Routine} routine Routine at the moment of message firing
 * @property {?number} selectedInstructionIndex New selected instruction index. May be null.
 */

/**
 * Type of custom event fired by sender
 * @typedef {("CONNECTED")} CastEventType
 */

/**
 * Callback called when an event about cast connection happens.
 * @callback CastEventHandler
 * @param {CastEventType} eventType Type of cast event
 * @param {string} senderId Sender id
 * @returns {void}
 */

/**
 * Type of custom event fired by sender
 * @typedef {("LOAD"|"PLAY"|"PAUSE"|"STOP")} SenderMessageEventType
 */

/**
 * This represents the custom data fired by sender in a custom event
 * @typedef SenderMessageEventData
 * @property {SenderMessageEventType} type Type of custom event
 * @property {?Routine} routine May be null
 */

/**
 * Callback called when a custom event fired from sender happens.
 * @callback SenderEventHandler
 * @param {SenderMessageEventType} type Type of custom event
 * @param {?Routine} routine May be null
 * @returns {void}
 */

/**
 * This listener is called whenever the receiver catches an event
 * @typedef CastReceiverListener
 * @property {CastEventHandler} onCastEvent Called when an event about cast connection happens. Currently only Connected event is fired.
 * @property {SenderEventHandler} onSenderEvent Called when a custom event fired from sender happens.
 */

class CastReceiver {
    /**
     * Build a receiver with an input listener
     * @param {string} namespace Cast connection namespace
     * @param {?CastReceiverListener} listener This listener is called whenever the receiver catches an event
     */
    constructor(namespace, listener) {
        this._namespace = namespace;
        this._listener = listener;

        this._context = cast.framework.CastReceiverContext.getInstance();

        this._context.addCustomMessageListener(namespace, this._onCustomMessage);

        this._context.addEventListener([
            // system.EventType.READY, system.EventType.SHUTDOWN, system.EventType.SENDER_DISCONNECTED, system.EventType.ERROR, system.EventType.SYSTEM_VOLUME_CHANGED, system.EventType.VISIBILITY_CHANGED, system.EventType.STANDBY_CHANGED, system.EventType.FEEDBACK_STARTED,
            cast.framework.system.EventType.SENDER_CONNECTED
        ], this._onCastEvent);
    }

    /**
     * @private
     * @type {string} Cast connection namespace
     */
    _namespace;

    /**
     * @type {?CastReceiverListener} This listener is called whenever the receiver catches an event
     */
    _listener;

    /** 
     * @private
     * @type {cast.framework.CastReceiverContext} 
     * */
    _context;

    /** 
     * @private
     * @type {PresentationState} 
     * */
    _appState = "IDLE";

    start = () => {
        this._context.start();
    }

    /**
     * @private 
     * @type {EventHandler} 
     * */
    _onCustomMessage = (event) => {
        log(() => 'CustomMessage: ');
        log(() => event);

        /** @type {SenderMessageEventData} */
        const eventData = event.data;

        if (this._listener) {
            this._listener.onSenderEvent(eventData.type, eventData.routine);
        }
    }

    /**
     * @private 
     * @type {EventHandler} 
     * */
    _onCastEvent = (e) => {
        log(() => `Event`);
        log(() => e);
        if (e.type === cast.framework.system.EventType.SENDER_CONNECTED) {
            log(() => `SENDER_CONNECTED: ${e.senderId}`);

            if (this._listener) {
                /** @type {CastEventType} */
                const eventType = "CONNECTED";
                this._listener.onCastEvent(eventType, e.senderId);
            }
        }
    }

    /**
     * @param {PresentationState} type
     * @param {Routine} routine
     * @param {string} senderId
     */
    sendState = (type, routine, senderId = null) => {
        this._appState = type;

        /** @type {MessagePayload} */
        const message = {
            type: type,
            routine: routine
        };

        this._sendMessage(message, senderId);
    }

    /**
     * @param {Routine} routine
     * @param {number} selectedInstructionIndex
     */
    onSelectedInstruction = (routine, selectedInstructionIndex) => {
        /** @type {MessagePayload} */
        const message = {
            type: 'SELECTED_INSTRUCTION',
            routine: routine,
            selectedInstructionIndex: selectedInstructionIndex
        };
        this._sendMessage(message);
    }

    /**
     * @private
     * @param {MessagePayload} message
     * @param {string} senderId
     */
    _sendMessage = (message, senderId = null) => {
        if (!this._context.isSystemReady()) {
            log(() => `System not ready: cannot send message`);
            return;
        }

        log(() => `Sending message: ${message.type}`);
        senderId = !senderId ? undefined : senderId; // When senderId is undefined, this broadcasts to all connected devices
        this._context.sendCustomMessage(this._namespace, senderId, message);
    }
}

export {
    CastReceiver
}