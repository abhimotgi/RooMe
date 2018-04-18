var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  roomName: {type: Number, required: true, unique: true}
});

roomSchema.statics.createRoom = (roomName) => {
  if (this.findOne({roomName: roomName})) {
    throw new Error('Room name already exists')
  }
  let newRoom = new this({
    roomName: roomName
  });
  return newRoom.save();
};

roomSchema.statics.roomExists = (roomName) => {
  return this.findOne({roomName: roomName})
    .then((room) => {
      return room;
    })
}

module.exports = mongoose.model('Room', roomSchema);