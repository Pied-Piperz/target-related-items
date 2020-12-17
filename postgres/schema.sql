DROP DATABASE IF EXISTS relateditems;
CREATE DATABASE relateditems;
DROP TABLE IF EXISTS games;
CREATE TABLE games (
sku int,
imgUrl varchar(255),
item varchar(255),
price numeric,
system varchar(50),
togetherOne int,
togetherTwo int,
togetherThree int,
PRIMARY KEY (sku)
);