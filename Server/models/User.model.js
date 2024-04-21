const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true },
    videoPlaylists: [{
                    name:String,
                    videos:[String]
                }],
    audioPlaylists: [{
        name:String,
        audios: [String]
    }],
    videoFavorites: [{type:String}],
    audioFavorites: [{type:String}],

    // whenever a user likes a video weight of all tags of that video increases by 2, when a user watches a video weight of its tags increase by 1.
    favoriteTags: [
        {
            tag:String,
            weight:Number
        }
    ],
    likedVideos:[String],
    dislikedVideos:[String],
    likedAudios:[String],
    dislikedAudios:[String],
    watchedVideos:[String],
    watchedAudios:[String],
    date: { type: Date, default: Date.now }
})
const User = new mongoose.model("User", userSchema);
module.exports = User