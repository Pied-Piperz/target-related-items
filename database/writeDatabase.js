const faker = require('faker');

var counter = 0;
var dbArr = [];

while (counter < 10000) {
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
  counter++;
  dbArr.push(docObj);
}


console.log(dbArr.length);
