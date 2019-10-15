import { log } from "./logger.js";

let countdownInterval; // this is a number representing the interval id
let listener;

const store = {
    state: {
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
    load: function (routine) {
        this.state.selectedStepIndex = -1; // nextStep will start from 0
        this.state.countdownTime = -1;
        if (countdownInterval) clearInterval(countdownInterval);

        this.state.routine = routine;
        if (listener) listener.onSendState('LOADED', routine);
    },
    play: function () {
        this.nextStep();
        if (listener) listener.onSendState('PLAYED', this.state.routine);
    },
    pause: function () {
        if (countdownInterval) clearInterval(countdownInterval);
        if (listener) listener.onSendState('PAUSED', this.state.routine);
    },
    stop: function () {
        this.state.selectedStepIndex = -1;
        this.state.countdownTime = -1;
        if (countdownInterval) clearInterval(countdownInterval);
        if (listener) listener.onSendState('STOPPED', this.state.routine);
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
        if (listener) listener.onSelectedInstruction(this.state.routine, this.state.selectedStepIndex);

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
}

Vue.component('step-item', {
    props: [
        'step',
        'selected',
    ],
    template: '<li v-bind:class="{ selected: selected }">{{ step.name }}</li>',
})

var app = new Vue({
    el: '#app',
    data: {
        state: store.state,
        appDisplay: 'auto', // When the app is ready, it will read this style prop
    },
    computed: {
        routine: function () {
            return this.state.routine;
        },
        title: function () {
            const routine = this.state.routine;
            if (!routine) {
                return '';
            }

            return this.state.routine.title
        },
        instructions: function () {
            const routine = this.state.routine;
            if (!routine) {
                return '';
            }

            return this.state.routine.instructions
        },
        selectedDescription: function () {
            const selectedStep = store.getSelectedStep();
            if (!selectedStep) {
                return '';
            }

            return selectedStep.description;
        },
        selectedDuration: function () {
            const selectedStep = store.getSelectedStep();
            if (!selectedStep) {
                return '';
            }

            return `${selectedStep.countdown} seconds`;
        },
        selectedVideoUrl: function () {
            const selectedStep = store.getSelectedStep();
            if (!selectedStep) {
                return '';
            }

            return selectedStep.videoUrl;
        },
        countdownTime: function () {
            const countdownTime = this.state.countdownTime;
            if (countdownTime < 0) {
                return '';
            }

            return countdownTime;
        }
    },
    methods: {
        isSelected: function (index) {
            return this.state.selectedStepIndex === index;
        },
        load: function (routine) {
            log(() => `Loading application with:`);
            log(() => routine);
            store.load(routine);
        },
        play: function () {
            const routine = this.state.routine;
            if (!routine) {
                log(() => `No routine loaded`);
                return;
            }

            log(() => `Playing routine:`);
            log(() => routine);
            store.play();
        },
        pause: function () {
            const routine = this.state.routine;
            if (!routine) {
                log(() => `No routine loaded`);
                return;
            }

            log(() => `Pausing routine:`);
            log(() => routine);
            store.pause();
        },
        stop: function () {
            log(() => `Stopping`);
            store.stop();
        },
        setListener: function (delegate) {
            listener = delegate;
        }
    }
});

export {
    app
};