/* global cast */ // this directive is for eslint

import { log, error } from "../logger.js";

class Player {
    constructor() {
        const context = cast.framework.CastReceiverContext.getInstance();
        this._playerManager = context.getPlayerManager();

        this._playerManager.addEventListener(cast.framework.events.category.CORE, this._onCoreEvent)
        this._playerManager.addEventListener(cast.framework.events.EventType.MEDIA_STATUS, this._onMediaStatusChanged)

        // As suggested by chromecast guide:
        const playerData = {};
        const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);

        // Update ui according to player state
        playerDataBinder.addEventListener(cast.framework.ui.PlayerDataEventType.STATE_CHANGED, this._onPlayerDataChanged);
    }

    /**
     * @private
     * @type {cast.framework.PlayerManager} Player manager instance from CAF
     */
    _playerManager = null;

    /**
     * @private
     * @type {string} Name of the last loaded video
     */
    _videoName = null;

    /**
     * @type {(videoName: string, autoplay = false) => void}
     * @param {string} videoName - All videos must be in assets/video
     * @param {boolean} autoplay - Default false
     */
    load = async (videoName, autoplay = false) => {
        try {
            const videoElem = document.getElementsByTagName("video")[0];
            await this._playerManager.setMediaElement(videoElem);

            const src = `assets/video/${videoName}`;
            log(() => `loading in playermanager: ${src}`);

            const loadRequestData = new cast.framework.messages.LoadRequestData();
            loadRequestData.autoplay = autoplay;
            loadRequestData.media.contentId = src;
            loadRequestData.media.streamType = "BUFFERED";
            loadRequestData.media.contentType = "video/webm";

            await this._playerManager.load(loadRequestData);
            this._videoName = videoName;
        } catch (err) {
            error(() => "Error while loading the video");
            error(() => err);
        }
    }

    play = () => {
        try {
            if (isNaN(this._playerManager.getDurationSec())) {
                // the player has been stopped, then I reload the video
                this.load(this._videoName, true);
            }
            else {
                this._playerManager.play();
            }
        } catch (err) {
            error(() => "Error while playing the video");
            error(() => err);
        }
    }

    pause = () => {
        try {
            this._playerManager.pause();
        } catch (err) {
            error(() => "Error while pausing the video");
            error(() => err);
        }
    }

    stop = () => {
        try {
            this._playerManager.stop();
        } catch (err) {
            error(() => "Error while stopping the video");
            error(() => err);
        }
    }

    /**
     * @private
     * @type {EventHandler}
     */
    _onCoreEvent = (event) => {
        log(() => `Core event: ${event.type}`);
        // log(() => event);
    }

    /**
     * @type {EventHandler}
     */
    _onMediaStatusChanged = (event) => {
        log(() => `MEDIA_STATUS event: ${event.type}`);
        // log(() => event);
    }

    /**
     * @type {PlayerDataChangedEventHandler}
     */
    _onPlayerDataChanged = (event) => {
        log(() => `PlayerDataChanged: ${event.value}`);
        log(() => event);
    }
}

export {
    Player
}