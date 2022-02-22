Create database if not exists flashcards_data;

Use flashcards_data;

DROP TABLE IF EXISTS admin, users, flashcards;

CREATE TABLE users {
  User_ID INT NOT NULL AUTO_INCREMENT
  email VARCHAR(50) NOT NULL,
  password VARCHAR(25) NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL, 
  program VARCHAR(25) NOT NULL,
  PRIMARY KEY (User_ID),
  FOREIGN KEY (program)
  REFERENCES flashcards (program)
   ON DELETE CASCADE
};

CREATE TABLE admin {
  Admin_ID INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(500) NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  PRIMARY KEY (Admin_ID)
};

CREATE TABLE flashcards {
  Card_ID INT NOT NULL AUTO_INCREMENT,
  program VARCHAR(25) NOT NULL,
  chapter INT NOT NULL,
  front_text VARCHAR(200) NOT NULL,
  back_text VARCHAR(200) NOT NULL,
  front_img LONGBLOB,
  back_img LONGBLOB
  PRIMARY KEY (Card_ID)
};