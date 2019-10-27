/**
 * A single step (or instructions) of a routine
 * @typedef {Object} Step
 * @property {String} name - Name of the routine
 * @property {String} description - Description of the step
 * @property {Number} countdown - In seconds. Duration of the step
 * @property {String} videoUrl - Url of the video
 */

/**
 * A routine is a collection of instructions
 * @typedef {Object} Routine
 * @property {String} title - Name of the routine
 * @property {String} source - Url of the routine source
 * @property {Step[]} instructions - List of steps
 */