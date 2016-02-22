/**
 * Created by Yuriy on 2/11/2016.
 */
/**
* Module dependencies
*/
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema;

/**
 * Answer Schema
 */
var AnswerSchema = new Schema({

    created: {
        type: Date,
        default: Date.now
    },

    student: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },

    course: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: false
    }

});


/**
 * Answer multiple choice model
 */

var MultipleChoiceSchema = AnswerSchema.extend({
    answer: {
        type: String,
        required: true,
        trim: true
    }
    //
    //correctAnswer: {
    //    type: String,
    //    required: true,
    //    trim: true
    //}
});


/**
 * Answer long answer model choice model
 */

var LongAnswerSchema = AnswerSchema.extend({
    answer: {
        type: String,
        required: true,
        trim: true
    }
});

/**
 * Validations
 */
//AnswerSchema.path('mp_answer').validate(function(mp_answer) {
//    return !!mp_answer;
//}, 'Answer cannot be blank');

/**
 * Statics
 */
//QuestionSchema.statics.load = function(id, cb) {
//    this.findOne({
//        _id: id
//    }).populate('creator', 'name username').exec(cb);
//};

mongoose.model('Answer', AnswerSchema);
mongoose.model('MultipleChoice', MultipleChoiceSchema);
mongoose.model('LongAnswer', LongAnswerSchema);