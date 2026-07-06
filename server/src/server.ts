import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.ts'


dotenv.config()

const app = express()

// 1. Global Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000

// 2. API Routes (Put these first)


// 3. Base/Health-check Route (Use .get instead of .use with a strict path)
app.get("/", (req, res) => {
  res.json({ message: "SERVER IS RUNNING!" });
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, ()=> {
      console.log('Server is running on port:', PORT)
    });
  } catch (error) {
    process.exit(1);
  }
}

startServer();
