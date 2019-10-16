class Player {
    /**
     * @param videoElem {HTMLVideoElement} video element to handle
     */
    constructor(videoElem) {
        this.videoElem = videoElem;
    }

    /**
     * @type HTMLVideoElement
     */
    videoElem = null;

    /**
     * @type {(videoName: string) => void}
     * @param {string} videoName - All videos must be in assets/video
     */
    load = (videoName) => {
        try {
            const src = `assets/video/${videoName}`;
            this.videoElem.src = src;
        } catch (error) {
            console.error(error);
        }
    }

    play = () => {
        try {
            const promise = this.videoElem.play();
            if (promise) promise.catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    pause = () => {
        try {
            const promise = this.videoElem.pause();
            if (promise) promise.catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    stop = () => {
        try {
            const promise = this.videoElem.pause();
            this.videoElem.currentTime = 0;
            if (promise) promise.catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    }
}

export {
    Player
}