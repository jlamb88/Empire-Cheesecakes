const db = require('../config/connection');
const { User, Product, Cart } = require('../models');
const seeds = require('./seedsjson');

db.once('open', async () => {
  try {
    // await User.deleteMany({});

    // await User.create(seeds.seedUser());

    // await Product.deleteMany({})

    // await Product.create(seeds.seedProduct())

    await Cart.deleteMany({})

    // await Cart.create(seeds.seedCart())

  }



  catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
