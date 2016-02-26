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

    answer: {
        type: String,
        required: true,
        trim: true
    }

    //We are storing answers in a course for now
    //course: {
    //    type: Schema.ObjectId,
    //    ref: 'Course',
    //    required: false
    //}

});

/**
 * Validations
 */
AnswerSchema.path('student').validate(function(student) {
    return !!student;
}, 'Student cannot be blank');

/**
 * Statics
 */
AnswerSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('student', 'name username').exec(cb);
};

mongoose.model('Answer', AnswerSchema);