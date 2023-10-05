import {MongoClient} from "mongodb"
import { NextResponse } from "next/server";

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI || '';

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

export async function POST(request: Request) {

    let body:any = await request.json(); 
    try {
      const database = client.db('stock');
      const inventory = database.collection('manufacturers');
  
      // Query for a movie that has the title 'Back to the Future'
    //   const query = {storeLocation:"Denver"};
      const manufacturer = await inventory.insertOne(body); 
      return NextResponse.json({manufacturer, statusCode: 200});
    }catch{
      console.log('error ocurred')
    }
      
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
  
  
  }

  export async function GET(request: Request) {

    try {
      const database = client.db('stock');
      const inventory = database.collection('manufacturers');
  
      // Query for a movie that has the title 'Back to the Future'
      const query = {};
      const allmanufac = await inventory.find(query).toArray();
      return NextResponse.json({ 
        statusCode: 200,
        body:  allmanufac ,
      });
    }catch{
      console.log('error')
    }
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
  
  
  }