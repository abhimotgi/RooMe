var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  description: {type: String, required: true},
  completed: Number,
  author: String,
  room: {
  	type: Schema.ObjectId,
  	required: true,
  	ref: 'Room'
  }
});

toDoSchema.statics.addItem = (description, completed, author, room) => {
	let newItem = new this({
		description,
		completed,
		author,
		room
	});
	return newItem.save();
};

toDoSchema.methods.getItems = (room) => {
	return this.find({room: room});
};

module.exports = mongoose.model('ToDoItem', toDoSchema);