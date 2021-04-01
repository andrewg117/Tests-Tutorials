const { MongoClient } = require('mongodb');
const pass = require('./creds');

//#region Commands

const listDatabases = async (client) => {
  const dbList = await client.db().admin().listDatabases();

  console.log("Databases:");
  dbList.databases.forEach(db => console.log(` - ${db.name}`));
}

// insert one object
const createListing = async (client, newListing) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
  console.log(`New listing ID: ${result.insertedId}`);
}

// insert many objects
const createMultipleListings = async (client, newListings) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
  console.log(`${result.insertedCount} listings added: `);
  console.log(result.insertedIds);
}

// get one object
const findOneListingByName = async (client, nameOfListing) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });
  if (result) {
    console.log(`Found listing with name: '${nameOfListing}':`);
    console.log(result);
  } else {
    console.log("Not Found");
  }
}

// get objects by filter
const findListingsByFilter = async (client, {
  minBedrooms = 0,
  minBathrooms = 0,
  maxResults = Number.MAX_SAFE_INTEGER
} = {}) => {
  const cursor = await client.db("sample_airbnb").collection("listingsAndReviews").find({
    bedrooms: { $gte: minBedrooms },
    bathrooms: { $gte: minBathrooms }
  })
    .sort({ last_review: -1 })
    .limit(maxResults);

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(`Found listing with '${minBedrooms}' bedrooms:`);

    results.forEach((result, i) => {
      date = new Date(result.last_review).toDateString();

      console.log(`${i + 1}. name: ${result.name}`);
      console.log(` _id: ${result._id}`);
      console.log(` bedrooms: ${result.bedrooms}`);
      console.log(` bathrooms: ${result.bathrooms}`);
      console.log(` last review date: ${new Date(result.last_review).toDateString()}`);
    });

  } else {
    console.log("Not Found");
  }
}

// update one object, first object found
const updateListingByName = async (client, nameOfListing, updatedListing) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne(
    { name: nameOfListing },
    { $set: updatedListing }
  );

  console.log(`${result.matchedCount} matched`);
  console.log(`${result.modifiedCount} updated`);
}

// update one object, insert if new
const upsertListingByName = async (client, nameOfListing, updatedListing) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne(
    { name: nameOfListing },
    { $set: updatedListing },
    { upsert: true }
  );

  console.log(`${result.matchedCount} matched`);

  if (result.upsertedCount > 0) {
    console.log(`Document inserted: ${result.upsertedId._id}`);
  } else {
    console.log(`${result.modifiedCount} were updated`)
  }
}

// update many objects 
const updateListingsByPropertyType = async (client) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany(
    { property_type: { $exists: false } },
    { $set: { property_type: "Unknown" } }
  );

  console.log(`${result.matchedCount} matched`);
  console.log(`${result.modifiedCount} updated`);
}


// delete one object, first found
const deleteListingByName = async (client, nameOfListing) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} deleted`);
}

// delete many objects
const deleteListingsBeforeDate = async (client, date) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({ "last_scraped": { $lt: date } });
  console.log(`${result.deletedCount} deleted`);
}

// get count of objects 
const countDocumentsByPropertyType = async (collection, type) => {
  const result = await collection.countDocuments( { property_type: type } );

  if(result > 0){
    console.log(`${result} matched property_type: ${type}`);
  } else {
    console.log("Non Found");
  }
}


// get distinct values
const distinctByField = async (collection, field, query) => {
  const distinctValues = await collection.distinct(field, query);

  if(distinctValues.length > 0){
    console.log(`${distinctValues.length} distinct ${field}:`)
    console.log(distinctValues);
  } else {
    console.log("Non Found");
  }
}

//#endregion

// connects to MongoDB Atlas DB and runs CRUD functions
const main = async () => {
  const uri = `mongodb+srv://andrew:${pass}@cluster0.pbvmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


  try {
    await client.connect();

    const database = client.db("sample_airbnb");
    const listingsAndReviews = database.collection("listingsAndReviews");

    // await countDocumentsByPropertyType(listingsAndReviews, "House");

    // await distinctByField(listingsAndReviews, "property_type", { bedrooms: { $lt: 2 }});

    // get collection stats
    // const result = await listingsAndReviews.stats(1024);
    // console.log(result);

    // await listDatabases(client); 

    /* await createListing(
      client, 
      {
        name: "Lovely Loft",
        summary: "A charming loft in Paris",
        bedrooms: 1,
        bathrooms: 1
      }
    );  */

    /* await createMultipleListings(
      client, 
      [
        {
          name: "Infinite Views",
          summary: "Modern home",
          property_type: "House",
          bedrooms: 5,
          bathrooms: 4.5,
          beds: 5
        },
        {
          name: "Private room in London",
          property_type: "Apartment",
          bedrooms: 1,
          bathrooms: 1
        },
        {
          name: "Beautiful Beach House",
          summary: "Relaxed beach living",
          bedrooms: 4,
          bathrooms: 2.5,
          beds: 7,
          last_review: new Date()
        }
      ]
      ); */

    // await findOneListingByName(client, "Lovely Loft");

    /* await findListingsByFilter(client, {
      minBedrooms: 4,
      minBathrooms: 2,
      maxResults: 5
    }); */

    /* await findOneListingByName(client, "Infinite Views");
    await updateListingByName(client, "Infinite Views", {
      bedrooms: 6,
      beds: 8
    });
    await findOneListingByName(client, "Infinite Views"); */

    /* await findOneListingByName(client, "Cozy Cottage");
    await upsertListingByName(client, "Cozy Cottage", {
      beds: 2
    });
    await findOneListingByName(client, "Cozy Cottage"); */

    // await updateListingsByPropertyType(client);

    // await deleteListingByName(client, "Cozy Cottage");

    // await deleteListingsBeforeDate(client, new Date("2019-02-15"));



  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

