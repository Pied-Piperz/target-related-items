\c relateditems;

DELETE FROM games;
COPY games (imgUrl, item, price, system, sku)
FROM '/Users/donaldbumiller/sdc/related-items/relatedItemsDatabase.csv'
DELIMITER ','
CSV HEADER;