var mongoose = require('mongoose');

// define the schema for our polls model
var pollSchema = mongoose.Schema({
        'question': String,
        'options': [],
        'votes': [],
        'voters': []
});

module.exports = mongoose.model('poll', pollSchema);