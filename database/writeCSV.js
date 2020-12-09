const faker = require('faker');
const fs = require('fs');

var counter = 0;
var file = fs.createWriteStream('./relatedItemsDatabase.csv');

file.write('imgUrl,item,price,system,sku');

while (counter < 10000000) {
  var curRow = '\n';
  curRow += ('http://placeimg.com/640/480');
  curRow += (',');
  curRow += (faker.lorem.sentence());
  curRow += (',');
  curRow += (faker.commerce.price(25, 69, 0) + .99);
  curRow += (',');
  var whichSystem = Math.floor(Math.random() * 4);
  if (whichSystem === 0) {
    whichSystem = 'switch';
  } else if (whichSystem === 1) {
    whichSystem = 'PS4';
  } else if (whichSystem === 2) {
    whichSystem = 'PS5';
  } else {
    whichSystem = 'xbox one';
  }
  curRow += (whichSystem);
  curRow += (',');
  curRow += (JSON.stringify(counter));
  file.write(curRow);
  if (counter % 250000 === 0) {
    console.log(counter);
  }
  counter++;
}