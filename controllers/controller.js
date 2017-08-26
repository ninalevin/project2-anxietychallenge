var express = require("express");
var router = express.Router();
var fs = require("fs");
var db = require("../models/");

	
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

//update question to completed
router.post("/api/addactivity/:id", function(req, res){
	db.Activity.create({
		QuestionId: req.params.id,
		journal_entry: 'blank',
		UserId: req.body.UserId
	}).then(function(){
		res.redirect("/api/generatequestions");
	});
});

// Export routes for server.js to use.
module.exports = router;