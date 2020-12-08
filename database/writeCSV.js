const faker = require('faker');
const fs = require('fs');

var counter = 0;
var file = fs.createWriteStream('./relatedItemsDatabase.csv');

file.write('imgUrl,item,price,system,sku\n');

while (counter < 2500000) {
  file.write('http://placeimg.com/640/480');
  file.write(',');
  file.write(faker.lorem.sentence());
  file.write(',');
  file.write(faker.commerce.price(25, 69, 0) + .99);
  file.write(',');
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
  file.write(whichSystem);
  file.write(',');
  file.write(JSON.stringify(counter));
  file.write('\n');
  if (counter % 250000 === 0) {
    console.log(counter);
  }
  counter++;
}