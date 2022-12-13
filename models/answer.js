const mongoose= require("mongoose");

const answerSchema= new mongoose.Schema({
    number: {
        type: Number,
    },
    answer1: {
        type: String,
    },
    answer2: {
        type: String,
    },
    answer3: {
        type: String,
    },
    answer4: {
        type: String,
    },
    answer5: {
        type: String,
    },
    answer6: {
        type: String,
    },
    answer7: {
        type: String,
    },
    answer8: {
        type: String,
    },
    answer9: {
        type: String,
    },
    answer10: {
        type: String,
    }
})

module.exports= mongoose.model('Answer', answerSchema);