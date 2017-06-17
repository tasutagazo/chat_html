var Message = require('../app/models/message.js');

exports.createMessage = function(req, res){
		var message = new Message();
		message.content = req.body.msg_content
		message.userId = req.user._id
		message.save(function(err){
			if(err){
				res.send(err)
			} 
			res.json(message.content)
		})
	};

exports.getMessage = function(req, res){
	Message.find(function(err, message){
		if(err){
			res.send(err)
		}
		res.json(message)
	})
};

exports.editMessage = function(req, res){
	Message.findById(req.params.message_id, function(err, message){
		if(err){
			res.send(err)
		}
	message.content = req.body.msg_content
	message.save(function(err){
		if(err){
			res.send(err)
		} 
	res.json(message.content)
		})
	})
}

exports.individualMessage = function(req, res){
	Message.findById(req.params.message_id, function(err, message){
		if(err){
		res.send(err)
		}
		res.json(message.content)
	})
}