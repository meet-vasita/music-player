const express = require('express');
const multer = require('multer');
const Song = require('../models/Song');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload Song
router.post('/upload', upload.fields([{ name: 'audio' }, { name: 'image' }, { name: 'video' }]), async (req, res) => {
    try {
        const { title, artist, album, genre } = req.body;
        const song = new Song({
            title,
            artist,
            album,
            genre,
            image: req.files.image[0].path,
            audio: req.files.audio[0].path,
            video: req.files.video?.[0]?.path,
        });
        await song.save();
        res.status(201).json(song);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload song' });
    }
});

// Get All Songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});

module.exports = router;
