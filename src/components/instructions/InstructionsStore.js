import { log } from "../../logger";

/**
 * @type {number} Interval object id
 */
let countdownInterval; // this is a number representing the interval id

const store = {
    state: {
        /**
         * @type {Routine}
         */
        routine: null,
        selectedStepIndex: -1,
        countdownTime: -1,
    },

    getSelectedStep: function () {
        const routine = this.state.routine;
        if (!routine) {
            return null;
        }

        if (this.state.selectedStepIndex < 0 || this.state.selectedStepIndex >= this.state.routine.instructions.length) {
            return null;
        }

        return this.state.routine.instructions[this.state.selectedStepIndex];
    },

    /**
     * @param {Routine} routine
     */
    load: function (routine) {
        log(() => `Loading application with:`);
        log(() => routine);

        this.state.selectedStepIndex = -1; // nextStep will start from 0
        this.state.countdownTime = -1;
        if (countdownInterval) clearInterval(countdownInterval);

        this.state.routine = routine;
        // if (listener) listener.onSendState('LOADED', routine);
    },
    play: function () {
        const routine = this.state.routine;
        if (!routine) {
            log(() => `No routine loaded`);
            return;
        }
        log(() => `Playing routine:`);
        log(() => routine);

        this.nextStep();
        // if (listener) listener.onSendState('PLAYED', this.state.routine);
    },
    pause: function () {
        const routine = this.state.routine;
        if (!routine) {
            log(() => `No routine loaded`);
            return;
        }
        log(() => `Pausing routine:`);
        log(() => routine);

        if (countdownInterval) clearInterval(countdownInterval);
        // if (listener) listener.onSendState('PAUSED', this.state.routine);
    },
    stop: function () {
        log(() => `Stopping`);

        this.state.selectedStepIndex = -1;
        this.state.countdownTime = -1;
        if (countdownInterval) clearInterval(countdownInterval);
        // if (listener) listener.onSendState('STOPPED', this.state.routine);
    },

    nextStep: function () {
        const routine = this.state.routine;
        if (!routine) {
            this.stop();
            return;
        }

        if (this.state.selectedStepIndex >= this.state.routine.instructions.length - 1) {
            log(() => 'reached end of list');
            this.stop();
            return false;
        }

        log(() => 'increasing step');
        this.state.selectedStepIndex += 1;
        // if (listener) listener.onSelectedInstruction(this.state.routine, this.state.selectedStepIndex);

        this.startCountdown();

        return true;
    },

    startCountdown: function () {
        if (countdownInterval) clearInterval(countdownInterval);

        const selectedCountdown = this.getSelectedStep().countdown;
        this.state.countdownTime = selectedCountdown;
        countdownInterval = setInterval(() => {

            if (this.state.countdownTime <= 0) {
                this.stopCountdown();
                this.nextStep();
                return;
            }

            log(() => 'decreasing countdown');
            this.state.countdownTime -= 1;

        }, 1000);
    },
    stopCountdown: function () {
        if (countdownInterval) clearInterval(countdownInterval);
    },
};

export {
    store
}