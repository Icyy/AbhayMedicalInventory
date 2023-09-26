import {MongoClient} from "mongodb"
import { NextResponse } from "next/server";

// Replace the uri string with your connection string.
const uri = "mongodb+srv://admin:ih5FxCw3aIBhpkY1@abhaymedical.razbu2k.mongodb.net/";

const client = new MongoClient(uri);

export async function GET(request: Request) {





  try {
    const database = client.db('sample_supplies');
    const sales = database.collection('sales');

    // Query for a movie that has the title 'Back to the Future'
    const query = {storeLocation:"Denver"};
    const stores = await sales.findOne(query);
    return NextResponse.json({'a':32, stores});
    console.log(stores);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }


}