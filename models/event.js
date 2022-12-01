const mongoose = require('mongoose')

const eventScheme = new mongoose.Schema({
    date:{
        type: Date,
        required: [true, 'Please add a date']
    }, 
    text:{
        type: String,
        required: [true, 'Please add what the event is about']
    }

})


module.exports = mongoose.model('calendar', eventScheme, 'calendar')
