
// const mongoose = require('mongoose');
// // Connection URL
// const url = DB_URL; // Replace with your MongoDB server URL and database name
// // Connect to MongoDB
// mongoose.connect(url);
// // Get the default connection
// const db = mongoose.connection;
// // Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
//   // You can perform your MongoDB operations here
//   // Close the connection when done
//   // mongoose.connection.close();
// });
const DB_URL = "mongodb+srv://mppm059:noida_hot@cluster0.wgdpjae.mongodb.net/test?retryWrites=true&w=majority/"
const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/mydatabase';

// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
    mongoose.connect(DB_URL, options)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
