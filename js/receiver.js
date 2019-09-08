import { trainingCard } from "./stub-instructions.js";

const DEBUG = true;

const log = (getLogContent) => {
    if (DEBUG) {
        console.log('[Cast-Your-Instructions]', getLogContent());
    }
}

let countdownInterval; // this is a number representing the interval id

const store = {
    state: {
        selectedStepIndex: -1,
        countdownTime: -1,
    },

    getSelectedStep: function () {
        if (this.state.selectedStepIndex < 0 || this.state.selectedStepIndex >= trainingCard.instructions.length) {
            return null;
        }

        return trainingCard.instructions[this.state.selectedStepIndex];
    },

    start: function () {
        this.state.selectedStepIndex = -1; // nextStep will start from 0
        if (countdownInterval) clearInterval(countdownInterval);
        this.nextStep();
    },
    stop: function () {
        this.state.selectedStepIndex = -1;
        this.state.countdownTime = -1;
        if (countdownInterval) clearInterval(countdownInterval);
    },

    nextStep: function () {
        if (this.state.selectedStepIndex >= trainingCard.instructions.length - 1) {
            log(() => 'reached end of list');
            this.stop();
            return false;
        }

        log(() => 'increasing step');
        this.state.selectedStepIndex += 1;

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
        trainingCard,
        state: store.state,
    },
    computed: {
        title: function () {
            return this.trainingCard.title
        },
        instructions: function () {
            return this.trainingCard.instructions
        },
        selectedDescription: function () {
            const selectedStep = store.getSelectedStep();
            if (!selectedStep) {
                return '';
            }

            return selectedStep.description;
        },
        countdownTime: function () {
            const countdownTime = this.state.countdownTime;
            if (countdownTime < 0) {
                return '';
            }

            return countdownTime;
        },
        selectedVideoUrl: function () {
            const selectedStep = store.getSelectedStep();
            if (!selectedStep) {
                return '';
            }

            return selectedStep.videoUrl;
        },
    },
    methods: {
        isSelected: function (index) {
            return this.state.selectedStepIndex === index;
        }
    }
});

setTimeout(() => store.start(), 2000);