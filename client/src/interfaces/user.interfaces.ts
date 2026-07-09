export interface IUser {
  _id?: string;        // MongoDB uses string ObjectIds (optional because new users don't have one yet)
  gmail: string;
  password?: string;   // Optional because your backend strips the password field when fetching data
  createdAt?: string;  // Automatically generated if you use Mongoose timestamps
  updatedAt?: string;  // Automatically generated if you use Mongoose timestamps
}