import { log } from "./logger.js";

let countdownInterval; // this is a number representing the interval id
let listener;

const store = {
    state: {
        recipe: null,
        selectedStepIndex: -1,
        countdownTime: -1,
    },

    getSelectedStep: function () {
        const recipe = this.state.recipe;
        if (!recipe) {
            return null;
        }

        if (this.state.selectedStepIndex < 0 || this.state.selectedStepIndex >= this.state.recipe.instructions.length) {
            return null;
        }

        return this.state.recipe.instructions[this.state.selectedStepIndex];
    },
    load: function (recipe) {
        this.state.selectedStepIndex = -1; // nextStep will start from 0
        this.state.countdownTime = -1;
        if (countdownInterval) clearInterval(countdownInterval);

        this.state.recipe = recipe;
        if (listener) listener.onLoad(recipe);
    },
    play: function () {
        this.nextStep();
        if (listener) listener.onPlay(this.state.recipe);
    },
    pause: function () {
        if (countdownInterval) clearInterval(countdownInterval);
        if (listener) listener.onPause(this.state.recipe);
    },
    stop: function () {
        this.state.selectedStepIndex = -1;
        this.state.countdownTime = -1;
        if (countdownInterval) clearInterval(countdownInterval);
        if (listener) listener.onStop(this.state.recipe);
    },

    nextStep: function () {
        const recipe = this.state.recipe;
        if (!recipe) {
            this.stop();
            return;
        }

        if (this.state.selectedStepIndex >= this.state.recipe.instructions.length - 1) {
            log(() => 'reached end of list');
            this.stop();
            return false;
        }

        log(() => 'increasing step');
        this.state.selectedStepIndex += 1;
        if (listener) listener.onSelectedInstruction(this.state.recipe, this.state.selectedStepIndex);

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
        title: function () {
            const recipe = this.state.recipe;
            if (!recipe) {
                return '';
            }

            return this.state.recipe.title
        },
        instructions: function () {
            const recipe = this.state.recipe;
            if (!recipe) {
                return '';
            }

            return this.state.recipe.instructions
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
        load: function (recipe) {
            log(() => `Loading application with:`);
            log(() => recipe);
            store.load(recipe);
        },
        play: function () {
            const recipe = this.state.recipe;
            if (!recipe) {
                log(() => `No recipe loaded`);
                return;
            }

            log(() => `Playing recipe:`);
            log(() => recipe);
            store.play();
        },
        pause: function () {
            const recipe = this.state.recipe;
            if (!recipe) {
                log(() => `No recipe loaded`);
                return;
            }

            log(() => `Pausing recipe:`);
            log(() => recipe);
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