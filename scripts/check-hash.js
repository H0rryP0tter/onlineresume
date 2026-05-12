import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
const col = mongoose.connection.collection('users');
const count = await col.countDocuments();
const users = await col.find({}, { projection: { email: 1 } }).toArray();
console.log('Total users in Atlas:', count);
console.log('Emails:', users.map(u => u.email));
await mongoose.disconnect();
