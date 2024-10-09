const mongoose = require ('mongoose');

mongoose
       .connect ("mongodb+srv://adjoudjugo:couzyHhPzTsEcyeJ@cluster0.cb7z6.mongodb.net/",)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log("failed to connect to MongoDB", err));