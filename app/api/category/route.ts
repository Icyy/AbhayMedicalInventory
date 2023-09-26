import {MongoClient} from "mongodb"
import { NextResponse } from "next/server";

// MongoDB Atlas connection URI
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


export async function GET(request: Request) {

    try {
      const database = client.db('stock');
      const inventory = database.collection('inventory');
  
      // Query for a movie that has the title 'Back to the Future'
      const categories = await inventory.distinct('category');
      return NextResponse.json({ 
        statusCode: 200,
        body:  categories ,
      });
      console.log(categories);
    }catch{
      console.log('error')
    }
    // } finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close();
    // }
  
  
  }