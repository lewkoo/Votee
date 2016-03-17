/**
 * Created by Yuriy on 2/11/2016.
 */
'use strict';

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

});


/**
 * Answer multiple choice model
 */

var MultipleChoiceSchema = AnswerSchema.extend({
    //TODO: add something here
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
    //TODO: add something here
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
//AnswerSchema.statics.load = function(id, cb) {
//    this.findOne({
//        _id: id
//    }).populate('creator', 'name username').exec(cb);
//};

mongoose.model('Answer', AnswerSchema);
mongoose.model('MultipleChoice', MultipleChoiceSchema);
mongoose.model('LongAnswer', LongAnswerSchema);
