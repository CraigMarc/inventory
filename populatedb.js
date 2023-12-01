#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require("./models/category");
  //const Genre = require("./models/genre");
 // const BookInstance = require("./models/bookinstance");
  
  const items = [];
  const categories = [];
  //const items = [];
 // const bookinstances = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createGenres();
    await createAuthors();
    await createBooks();
    await createBookInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  /*
  async function genreCreate(index, name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres[index] = genre;
    console.log(`Added genre: ${name}`);
  }
  
  async function authorCreate(index, first_name, family_name, d_birth, d_death) {
    const authordetail = { first_name: first_name, family_name: family_name };
    if (d_birth != false) authordetail.date_of_birth = d_birth;
    if (d_death != false) authordetail.date_of_death = d_death;
  
    const author = new Author(authordetail);
  
    await author.save();
    authors[index] = author;
    console.log(`Added author: ${first_name} ${family_name}`);
  }*/

  async function categoryCreate(index, name, description) {
    const itemdetail = {
      name: name,
      description: description,
      
    };
    
  
    const category = new Category(itemdetail);
    await Category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }

  
  async function itemCreate(index, name, description, price, number, category) {
    const itemdetail = {
      name: name,
      description: description,
      price: price,
      number: number,
      category: category,
    };
    
  
    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  /*
  async function bookInstanceCreate(index, book, imprint, due_back, status) {
    const bookinstancedetail = {
      book: book,
      imprint: imprint,
    };
    if (due_back != false) bookinstancedetail.due_back = due_back;
    if (status != false) bookinstancedetail.status = status;
  
    const bookinstance = new BookInstance(bookinstancedetail);
    await bookinstance.save();
    bookinstances[index] = bookinstance;
    console.log(`Added bookinstance: ${imprint}`);
  }*/
  /*
  async function createGenres() {
    console.log("Adding genres");
    await Promise.all([
      genreCreate(0, "Fantasy"),
      genreCreate(1, "Science Fiction"),
      genreCreate(2, "French Poetry"),
    ]);
  }*/
  
  async function createCategory() {
    console.log("Adding Categories");
    await Promise.all([
      categoryCreate(0, "Bikes", "full bikes", "1973-06-06"),
      categoryCreate(1, "Parts", "bike parts", "1932-11-8"),
      categoryCreate(2, "Accessories", "bike accessories"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(0,
        "Trek Fuel EX 5 Deore Gen 5",
        "Fuel EX 5 is the gateway to full suspension trail bikes. Trail-taming front and rear suspension, a Shimano 1x12 drivetrain, a dropper post for getting low on descents, and hydraulic disc brakes make Fuel EX 5 a high-value, high-performance mountain bike with exceptional versatility.",
        2,099.99,
        6,
        [categories[0]]
      ),
      itemCreate(1,
        "Trek Roscoe 7",
        "Roscoe 7 is a hardtail for riders who wanna have a blast ripping up the trail. A plush 140mm suspension fork, 29er wheels, and a wide-range drivetrain with plenty of gears make this bike great for new riders yet playful enough to make even the most experienced shredders smile.",
        1,349.99,
        5,
        [categories[0]]
      ),
      itemCreate(2,
        "Shimano GRX RX400 Hydraulic Disc Brake",
        "With a low-profile Flat Mount design, the Shimano GRX BR-RX400 hydraulic disc brakes provide greater control for mixed terrain riding.",
        54.99,
        10,
        [categories[1]]
      ),
      itemCreate(3,
        "Shimano GRX RX812 11-Speed Rear Derailleur",
        "With an integrated chain stabilizer mechanism, the Shimano GRX derailleur provides a quieter experience with shifting security and precision on mixed terrain. For rides on smooth surfaces, the derailleur features and ON/OFF switch for the chain stabilizer. The RD-RX812 rear derailleur is compatible with MTB cassettes with a max cog size of 42T.",
        119.99,
        6,
        [categories[1]]
      ),
      itemCreate(4,
        "RockShox Deluxe Ultimate Rear Shock",
        "A perfect match for the current crop of ultra-lightweight and capable dream bikes, Deluxe Ultimate offers a fully checked damper design allowing for a Low Speed Compression adjustment and optimal traction control tuning. It also features Maxima Plush fluid for added performance and ride quality so you can go on and shred to your heart’s content.",
        407.00,
        3,
        [categories[1]]
      ),
      itemCreate(5,
        "Cannondale Dirt Mini Pump",
        "Stay pumped. Packed with clever features that prioritize convenience and functionality, and gets large volume off-road tires to the correct pressures quickly.",
        48.00,
        6,
        [categories[3]]
      ),
      itemCreate(6,
        "Bontrager Bontrager Circuit Twin Gel Cycling Glove",
        "A versatile bike glove with optimized gel and gel foam padding for all-day comfort.",
        15.99,
        12,
        [categories[3]]
      ),
    ]);
  }
  /*
  async function createBookInstances() {
    console.log("Adding authors");
    await Promise.all([
      bookInstanceCreate(0, books[0], "London Gollancz, 2014.", false, "Available"),
      bookInstanceCreate(1, books[1], " Gollancz, 2011.", false, "Loaned"),
      bookInstanceCreate(2, books[2], " Gollancz, 2015.", false, false),
      bookInstanceCreate(3,
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(4,
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(5,
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(6,
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Available"
      ),
      bookInstanceCreate(7,
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Maintenance"
      ),
      bookInstanceCreate(8,
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Loaned"
      ),
      bookInstanceCreate(9, books[0], "Imprint XXX2", false, false),
      bookInstanceCreate(10, books[1], "Imprint XXX3", false, false),
    ]);
  }*/