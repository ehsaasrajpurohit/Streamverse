const Room = require("../models/Room.model");

const CreateRoom = (socket) => {
    socket.on("createRoom", (res, cb) => {
        const roomName = res.roomName;
        const userName = res.createUserName;
        const userID = res.userID
        const room = new Room({
            roomName: roomName,
            AdminID: userID,
            userArray: [{
                userId: userID,
                userName: userName,
                role:"Admin",
            }]
        })
        room
            .save()
            .then(async (room) => {
                await socket.join(room._id.toString())
                await socket.join(userID.toString())
                cb({
                    room
                })
            })
    })

}

module.exports = CreateRoom;