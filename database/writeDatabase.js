const faker = require('faker');
var fs = require('fs');

var counter = 0;
var file = fs.createWriteStream('./relatedItemsDatabase.json');

file.write('[');

// 10000000
while (counter < 10000000) {
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
  var docObj = {
    item: faker.lorem.sentence(),
    price: faker.commerce.price(25, 69, 0, '$') + '.99',
    imgUrl: 'http://placeimg.com/640/480',
    system: whichSystem,
    sku: counter
  }

  if (counter % 100000 === 0) {
    console.log(counter);
  }

  if (counter !== 9999999) {
    file.write(JSON.stringify(docObj) + ',');
  } else {
    file.write(JSON.stringify(docObj));
  }
  counter++;
}
file.write(']');