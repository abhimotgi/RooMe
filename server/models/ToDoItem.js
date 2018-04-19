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
  // room: String
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

toDoSchema.statics.getItems = function (roomId) {
	return this.find({roomId: roomId});
};

module.exports = mongoose.model('ToDoItem', toDoSchema);