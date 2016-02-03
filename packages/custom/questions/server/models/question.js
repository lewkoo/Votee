/**
 * Created by lewkoo on 2016-01-27.
 */

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({

    created: {
        type: Date,
        default: Date.now
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: false,
        trim: true
    },

    type: {
        type: String,
        enum: ['MULTIPLE-CHOICE', 'OPEN-ENDED'],
        required: true,
        default: 'MULTIPLE-CHOICE'
    },

    answers: [{
        type: String,
        required: false
    }],

    creator: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }

});

mongoose.model('Question', QuestionSchema);