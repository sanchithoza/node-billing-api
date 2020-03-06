//seting environment variable for knex object
const environment = process.env.ENVIRONMENT || 'development'
//storing configs with enviornment from from auto generated file knexfile.js in root folder
const config = require('../knexfile.js')[environment];
//exporting knex object with specified configurations
module.exports = require('knex')(config);