const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Audio = require('../models/Audio.model');
const User = require('../models/User.model');
const { default: mongoose } = require("mongoose");

router.post("/", checkAuth, (req, res) => {
    console.log('request body: ', req.body);
    const playlistId = req.body.playlistId;
    User.find({_id:req.userData.userId})
    .then((user)=>{
        const playlists = user[0].audioPlaylists;
        console.log(playlists);
        let playlist = [];
        for(let idx = 0;idx<playlists.length;idx++) {
            if(playlists[idx]._id==playlistId) playlist = playlists[idx];
        }
        console.log('playlist: ',playlist);
        
        // get all videos of a playlist.
        Audio.find({_id:{$in:playlist.audios}})
        .then((result)=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router