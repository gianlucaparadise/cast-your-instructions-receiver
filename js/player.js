import { log } from "./logger.js";

class Player {
    /**
     * @param playerManager {cast.framework.PlayerManager} chromecast player manager
     */
    constructor(playerManager) {
        this.playerManager = playerManager;

        this.playerManager.addEventListener(cast.framework.events.category.CORE, this.onCoreEvent)
        this.playerManager.addEventListener(cast.framework.events.EventType.MEDIA_STATUS, this.onMediaStatusChanged)

        // As suggested by chromecast guide:
        const playerData = {};
        const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);

        // Update ui according to player state
        playerDataBinder.addEventListener(cast.framework.ui.PlayerDataEventType.STATE_CHANGED, this.onPlayerDataChanged);
    }

    /**
     * @type cast.framework.PlayerManager
     */
    playerManager = null;

    videoName = null;

    /**
     * @type {(videoName: string, autoplay = false) => void}
     * @param {string} videoName - All videos must be in assets/video
     * @param {boolean} autoplay - Default false
     */
    load = (videoName, autoplay = false) => {
        try {
            const src = `assets/video/${videoName}`;
            log(() => `loading in playermanager: ${src}`);

            /**
             * @type {cast.framework.messages.LoadRequestData}
             */
            const loadRequestData = {
                autoplay: autoplay,
                media: {
                    contentId: src,
                    streamType: 'BUFFERED',
                    contentType: 'video/webm',
                    metadata: {
                        title: ''
                    }
                }
            };
            this.playerManager.load(loadRequestData);
            this.videoName = videoName;
        } catch (error) {
            console.error(error);
        }
    }

    play = () => {
        try {
            if (isNaN(this.playerManager.getDurationSec())) {
                // the player has been stopped, then I reload the video
                this.load(this.videoName, true);
            }
            else {
                this.playerManager.play();
            }
        } catch (error) {
            console.error(error);
        }
    }

    pause = () => {
        try {
            this.playerManager.pause();
        } catch (error) {
            console.error(error);
        }
    }

    stop = () => {
        try {
            this.playerManager.stop();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @type {EventHandler}
     */
    onCoreEvent = (event) => {
        log(() => `Core event: ${event.type}`);
        // log(() => event);
    }

    /**
     * @type {EventHandler}
     */
    onMediaStatusChanged = (event) => {
        log(() => `MEDIA_STATUS event: ${event.type}`);
        // log(() => event);
    }

    /**
     * @type {PlayerDataChangedEventHandler}
     */
    onPlayerDataChanged = (event) => {
        log(() => `PlayerDataChanged: ${event.value}`);
        log(() => event);
    }
}

export {
    Player
}