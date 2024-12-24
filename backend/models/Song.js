const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    genre: { type: String },
    image: { type: String },
    audio: { type: String, required: true },
    video: { type: String },
});

module.exports = mongoose.model('Song', songSchema);
