var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
//var Post = require('Post');

var levelSchema = new Schema({
    dateCreated: {type: Date, default: Date.now},
    walls: [],
    ballStart: {},
    hole: {},
    hazards: [],
    name: {type: String},
    par: {type: Number},
});

module.exports = mongoose.model('Level', levelSchema);
