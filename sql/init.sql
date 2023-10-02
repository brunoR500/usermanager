CREATE TABLE IF NOT EXISTS users (
  PRIMARY KEY(id),
  id       SERIAL            NOT NULL UNIQUE,
  user_name     VARCHAR(30)      NOT NULL UNIQUE,
  first_name    VARCHAR(150)    NOT NULL,
  last_name     VARCHAR(150)      NOT NULL,
  birthday      DATE      NOT NULL,
  last_login   TIMESTAMP      NOT NULL,  
  email        VARCHAR(300)      NOT NULL,
  password        VARCHAR(300)      NOT NULL
);