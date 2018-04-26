var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  description: {type: String, required: true},
  completed: Number,
  author: String,
  roomId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Room'
  }
});

toDoSchema.statics.addItem = function (description, completed, author, roomId) {
  let newItem = new this({
    description: description,
    completed: completed,
    author: author,
    roomId: roomId
  });
  return newItem.save();
};

toDoSchema.statics.removeItem = function (roomId) {
  return this.deleteOne({_id: roomId});
}

toDoSchema.statics.getItems = function (roomId) {
  return this.find({roomId: roomId});
};

toDoSchema.statics.getAllItems = function () {
  return this.find();
};


toDoSchema.statics.toggleItem = function (itemId) {
  return this.findOne({_id: itemId})
    .then((item) => {
      item.completed = item.completed === 0 ? 1 : 0;
      return item.save();
    });
}

module.exports = mongoose.model('ToDoItem', toDoSchema);