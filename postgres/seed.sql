\c relateditems;

DELETE FROM games;
COPY games (sku, imgUrl, item, price, system, togetherOne, togetherTwo, togetherThree)
-- FROM '/Users/donaldbumiller/sdc/related-items/relatedItemsDatabase.csv'
FROM '/home/ec2-user/data/relatedItemsDatabase.csv'
DELIMITER ','
CSV HEADER;