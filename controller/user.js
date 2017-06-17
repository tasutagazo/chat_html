var User = require('../app/models/user.js');

exports.createUser = function(req, res){
	var user = new User();
	user.username = req.body.user_name;
	user.password = req.body.pass;
	user.save(function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'User Created'})
	})
}

exports.logUser = function(req, res){
	User.find()
	.where('username').equals(req.body.user_name)
	.where('password').equals(req.body.pass)
	.exec(function(err, user){
		if(err){
			res.send(err)
		}
		res.json({message: "Welcome " + user});
	})
}

