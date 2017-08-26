var express = require("express");
var router = express.Router();
var fs = require("fs");
var db = require("../models/");
var path = require("path");
var body = require("body-parser");

<<<<<<< HEAD
	
router.get("/api/generatequestions", function(req, res) {
  var hbsObject = {};
  db.Question.sequelize.query('Select * from Questions WHERE id NOT IN (SELECT id FROM activities)', {
      type: db.Question.sequelize.QueryTypes.SELECT
    })
    .then(function(data) {
      hbsObject.questions = data;
      db.Activity.findAll({
          where: db.Question.id = db.Activity.QuestionId,
          include: [db.Question]
        })
        .then(function(data) {
          hbsObject.completedQuestions = data;
          hbsObject.userId = '1';
          res.render("challenges", hbsObject);
        });
    });
=======
router.post("/api/addactivity/:id", function(req, res) {
	db.Activity.create({
		QuestionId: req.params.id,
		journal_entry: 'blank',
		UserId: req.body.UserId
	}).then(function() {
		res.redirect("/api/generatequestions");
	});
});
>>>>>>> upstream/master


	router.get("/", function(req, res){
		res.render("index");
	});

	router.get("/api/generatequestions", function(req, res){
		var hbsObject = {};
		db.Question.sequelize.query('Select * from Questions WHERE id NOT IN (SELECT id FROM Activities)',
			{type: db.Question.sequelize.QueryTypes.SELECT})
		.then(function(data){
			hbsObject.questions = data;
			db.Activity.findAll({
				where: db.Question.id = db.Activity.QuestionId,
				include: [db.Question]
			})
			.then(function(data){
				hbsObject.completedQuestions = data;
				hbsObject.userId = '1';
				res.render("challenges", hbsObject);
			});
		});
	});

	router.post("/user/check", function(req, res) {
		var new_user = req.body;
		console.log("------------------------------");
		console.log(req.body);
		db.User.findOne({
			where: {
				google_id: new_user.guid
			}
		}).then(data => {
			if (data === null) {
				db.User.create({
					google_id: new_user.guid,
					name: new_user.name,
					email: new_user.email,
					photo: new_user.picture
				}).then(result => {
					console.log("------------------------------");
					console.log("successfully wrote new user to database");
        // redirect stuff still not working
        console.log(result);
        res.send({
        	redirect: "challenges",
        	user_data: result.dataValues
        });
      });
		} else {
			console.log(data.dataValues);
      //redirect stuff still not working
      res.send({
      	redirect: "challenges",
      	user_data: data.dataValues
      });
    }
 		});
	});

	router.get("/api/getuserprogress", function(req, res) {
		var hbsObject = {};
		db.User.findOne({
			where: {
				google_id:guid
			},
			include: id
			.then(function(data) {
				db.Activity.findAll({
					where: {
						UserId: data
					},
					include: [[sequelize.fn('COUNT', sequelize.col('QuestionId')), 'completedCount']]
				});
        // .then(function(data) {
        //   hbsObject.completedQuestions = data;
        //   hbsObject.userId = '1';
        //   res.render("challenges", hbsObject);
        // });
      })
		})
	});


	module.exports = router;
