import {MongoClient} from "mongodb"
import { NextResponse } from "next/server";

// Replace the uri string with your connection string.
const uri = "mongodb+srv://admin:ih5FxCw3aIBhpkY1@abhaymedical.razbu2k.mongodb.net/";

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase();

export async function GET(request: Request) {

  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const allProducts = await inventory.find(query).toArray();
    return NextResponse.json({ 
      statusCode: 200,
      body:  allProducts ,
    });
    console.log(allProducts);
  }catch{
    console.log('error')
  }
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }


}

export async function POST(request: Request) {

    let body:any = await request.json(); 
    try {
      const database = client.db('stock');
      const inventory = database.collection('inventory');
  
      // Query for a movie that has the title 'Back to the Future'
    //   const query = {storeLocation:"Denver"};
      const product = await inventory.insertOne(body); 
      return NextResponse.json({product, statusCode: 200});
    }catch{
      console.log('error')
    }
      
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
  
  
  }