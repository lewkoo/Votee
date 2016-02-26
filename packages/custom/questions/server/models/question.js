/**
 * Created by lewkoo on 2016-01-27.
 */
'use strict';

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
        type:       String,
        enum:       ['MULTIPLE-CHOICE', 'OPEN-ENDED'],
        required:   true,
        default:    'MULTIPLE-CHOICE'
    },

    //answers: [{
    //    type: String,
    //    required: false
    //}],
    //
    answer: {
        type: String,
        required: true,
        trim: true
    },

    creator: {
        type:       Schema.ObjectId,
        ref:        'User',
        required:   true
    },

    options: {
        type:       Object,
        required:   false
    },

    answers:[{
        type:       mongoose.Schema.Types.ObjectId,
        ref:        'Answer',
        required:   'False'
    }]

});

/**
 * Validations
 */
QuestionSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
QuestionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('creator', 'name username').populate({
        path: 'answers',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'student' }
    }).exec(cb);
};

mongoose.model('Question', QuestionSchema);
