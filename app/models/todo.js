var mongoose = require('mongoose');

// ce naiba e asta? module asta de unde e importat?
module.exports = mongoose.model('Todo', {
    // ce naiba e sintaxa asta si de ce e pusa asa?
    text: {
        type: String,
        default: ''
    }
});