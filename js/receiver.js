import { trainingCard } from "./stub-instructions.js";

const DEBUG = true;

const log = (getLogContent) => {
    if (DEBUG) {
        console.log('[Cast-Your-Instructions]', getLogContent());
    }
}

const store = {
    state: {
        selectedStepIndex: 0,
    },
    nextStep: function () {
        if (this.state.selectedStepIndex >= trainingCard.instructions.length - 1) {
            log(() => 'reached end of list');
            return false;
        }

        log(() => 'increasing step');
        this.state.selectedStepIndex += 1;
        return true;
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
        selectedStep: function () {
            return this.trainingCard.instructions[this.state.selectedStepIndex];
        },
        selectedDescription: function () {
            return this.selectedStep.description;
        },
        selectedCountdown: function () {
            return this.selectedStep.countdown;
        },
        selectedVideoUrl: function () {
            return this.selectedStep.videoUrl;
        },
    },
    methods: {
        isSelected: function (index) {
            return this.state.selectedStepIndex === index;
        }
    }
});

const interval = setInterval(() => {
    const hasIncreased = store.nextStep();

    if (!hasIncreased) {
        log(() => 'Stopping interval');
        clearInterval(interval);
    }

}, 2000);