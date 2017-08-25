var express = require("express");
var router = express.Router();
var fs = require("fs");
var db = require("../models/");

	//test user for database
	var testUser ={
		name: 'Jesse',
		google_id: '12345',
		email: 'jessesternmusic@gmail.com',
		imageURL: 'http://sternj20.github.io'
	};

	router.get("/", function(req, res){
		var hbsObject;
		db.Question.findAll({})
		.then(function(data){
			hbsObject	= {questions: data};
			db.Activity.findAll({})
			.then(function(data){
				hbsObject.completedQuestions = data;
			res.render("index", hbsObject);
			});
		});
	});
	
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
});

//update question to completed
router.post("/api/addactivity/:id", function(req, res){
	db.Activity.create({
		question_id: req.params.id,
		journal_entry: 'blank'
	});
	res.redirect("/")
});

// Export routes for server.js to use.
module.exports = router;