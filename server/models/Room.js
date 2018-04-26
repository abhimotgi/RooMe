var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var roomSchema = new Schema({
  roomName: {type: String, required: true, unique: true}
});

roomSchema.statics.createRoom = function (roomName, roomPassword) {
  let newRoom = new this({
    roomName: roomName
  });
  return newRoom.save();
};

roomSchema.statics.roomExists = function (roomName, roomPassword) {
  return this.findOne({roomName: roomName})
    .then((room) => {
      return room;
    })
};

roomSchema.statics.getRoomInfo = function (roomId) {
  return this.findOne({_id: roomId})
    .then((room) => {
      return room;
    })
};

roomSchema.statics.getRooms = function () {
  return this.find();
};

module.exports = mongoose.model('Room', roomSchema);