module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now')
    }
  });

  return User;
};

// SELECT * FROM Questions INNER JOIN Activities ON Questions.id = Activities.questionId;
