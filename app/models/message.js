var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	content: String,
	createdAt: Date,
	userId: {
		type: String
	}
});

module.exports = mongoose.model('Message', messageSchema);