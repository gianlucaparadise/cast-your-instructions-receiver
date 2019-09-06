import { trainingCard } from "./stub-instructions.js";

const DEBUG = true;

const log = (getLogContent) => {
    if (DEBUG) {
        console.log('[Cast-Your-Instructions]', getLogContent());
    }
}

Vue.component('step-item', {
    props: [
        'step'
    ],
    template: '<li>{{ step.name }}</li>',
})

var app = new Vue({
    el: '#app',
    data: {
        trainingCard
    },
    computed: {
        title: function () {
            return this.trainingCard.title
        },
        instructions: function () {
            return this.trainingCard.instructions
        },
    }
})

log(() => 'test');