const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require("passport")
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000; 
const mongoose = require('mongoose');
require("dotenv").config({ path: "./config/.env" });
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const patientModel = require('./models/patients'); 

const patientsRoutes = require("./routes/patients.route");
const medicamentRoutes = require("./routes/medicaments.route");
// const traitementRoutes = require("./routes/traitements.route");
// const RendezVousRoutes = require("./routes/rendezVous.route");


require('./config/db');

app.use(express.json());

const corsOptions = {
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());                                                                

app.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,  
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await patientModel.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    } else {
      const newUser = new patientModel({
        googleId: profile.id,
        nom: profile.name.givenName,
        prenom: profile.name.familyName,
        email: profile.emails[0].value
      });
      user = await newUser.save();
      return done(null, user);
    }
  } catch (err) {
    return done(err, null);
  }
}
));

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
try {
  const user = await patientModel.findById(id);
  done(null, user);
} catch (err) {
  done(err, null);
}
});


app.use("/api/patient", patientsRoutes);
app.use("/api/medicament", medicamentRoutes);
// app.use("/api/traitement", traitementRoutes);
// app.use("/api/rendez-vous", RendezVousRoutes);



const server = app.listen(process.env.PORT, () => {
  console.log(`Listenning on http://localhost: ${process.env.PORT}`);
});
