const { MongoClient } = require('mongodb');
const pass = require('./creds');

const listDatabases = async (client) => {
  const dbList = await client.db().admin().listDatabases();

  console.log("Databases:");
  dbList.databases.forEach(db => console.log(` - ${db.name}`));
}

const createListing = async (client, newListing) => {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
  console.log(`New listing ID: ${result.insertedID}`);
}

const main = async () => {
  const uri = `mongodb+srv://andrew:${pass}@cluster0.pbvmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    // await listDatabases(client); 
    await createListing(
      client, 
      {
        name: "Lovely Loft",
        summary: "A charming loft in Paris",
        bedrooms: 1,
        bathrooms: 1
      }
    );  

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

