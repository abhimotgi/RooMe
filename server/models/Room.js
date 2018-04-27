var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var roomSchema = new Schema({
  roomName: {type: String, required: true, unique: true},
  roomPassword: {type: String}
});

/*roomSchema.statics.createRoom = function (roomName, roomPassword) {
  let newRoom = new this({
    roomName: roomName
  });
  return newRoom.save();
};*/

roomSchema.statics.createRoom = function (roomName, roomPassword) {
  let newRoom = new this({
    roomName: roomName, 
    roomPassword: roomPassword
  });
  return bcrypt.hash(newRoom.roomPassword, 10)
    .then((hash) => {
      newRoom.roomPassword = hash;
      return newRoom.save();
    })
}

roomSchema.statics.roomExists = function (roomName, roomPassword) {
  return this.findOne({roomName: roomName})
    .then((room) => {
      return room;
    })
};

roomSchema.statics.loginRoom = function (roomName, roomPassword) {
  return this.findOne({roomName: roomName})
    .then((room) => {
      return bcrypt.compare(roomPassword, room.roomPassword)
    })
    .then((res) => {
      if (res) {
        return this.findOne({roomName: roomName});
      } else {
        throw new Error('Invalid password');
      }
    });
}

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