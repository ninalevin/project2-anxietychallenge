module.exports=function(sequelize, Datatypes){
	var Question = sequelize.define("Question", {
		challenge: Datatypes.STRING,
		difficulty: Datatypes.INTEGER,
	});
Question.associate = function(models){
	Question.hasMany(models.Activity, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	return Question;
};