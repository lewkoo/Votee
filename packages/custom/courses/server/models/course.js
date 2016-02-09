/**
 * Created by lewkoo on 2016-01-27.
 */

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({

    created: { // the date a course was created
        type: Date,
        default: Date.now
    },

    courseNumber: { // specifies
        type: Number,
        required: true,
        unique: true
    },

    title: { // course title
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: false,
        trim: true
    },

    professor: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },

    students : [{
        type: Schema.ObjectId,
        ref: 'User',
        required: false
    }], // this is how you store a collection of Mongoose objects

    questions : [{
        type: Schema.ObjectId,
        ref: 'Question',
        required: false
    }] // collection of Questions
});

mongoose.model('Course', CourseSchema);