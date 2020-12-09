DROP DATABASE IF EXISTS relateditems;
CREATE DATABASE relateditems;
DROP TABLE IF EXISTS games;
CREATE TABLE games (
  imgUrl varchar(255),
  item varchar(255),
  price int,
  system varchar(50),
  sku int
);