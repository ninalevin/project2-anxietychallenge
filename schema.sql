### Schema

CREATE DATABASE anxiety;

USE anxiety;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
  google_id varchar(255) NOT NULL,
  email varchar(255),
  imageURL varchar(500),
	PRIMARY KEY (id)
);

CREATE TABLE challenges
(
	id int NOT NULL AUTO_INCREMENT,
	challenge varchar(500) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE journal
(
	id int NOT NULL AUTO_INCREMENT,
  completed_on DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	journal_entry varchar(1024),
  user_id int NOT NULL,
  challenge_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);
