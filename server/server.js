require('dotenv').config();

const express = require('express')
, bodyParser = require('body-parser')
, Auth0Strategy = require('passport-auth0')
, massive = require('massive')
, session = require('express-session')
, cors = require('cors')
, passport = require('passport')
, request = require('request');

const app = express();
const controller = require('./controller')

app.use(bodyParser.json());
app.use(cors())

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


//DATABASE CONNECTION
massive(process.env.CONNECTIONSTRING).then(db => {
    app.set('db', db);
})

//AUTHENTICATION
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENTID,
    clientSecret: process.env.AUTH_CLIENTSECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')
    
    db.users.find_user(profile.id).then(user => {
        if  (user[0]) {
            return done(null, user[0]);
        } else {
            db.users.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.id])
            .then(user => {
                return done(null,user[0]);
            })
        }
    })
}));

passport.serializeUser(function (user, done) {
    console.log('serialize', user)
    done(null,user)
})

passport.deserializeUser(function (user, done) {
    console.log('deserialize', user)
    
    // app.get('db').users.find_session_user(user.id).then(user => {
    //     return done(null, user[0]);
    // })
    done(null, user)
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/#/'
}));

app.get('/auth/me', (req, res) => {
    console.log('start', req.user)
    if(!req.user) {
        console.log('FAIL', req.user)
        return res.status(404).send('User not found')
    } else {
        console.log('yoyoyo',req.user)
        return res.status(200).send(req.user);
    }
})

app.get('/auth/logout', (req, res) => {
    req.logOut()
    return res.redirect(302, 'http://localhost:3000/#/');
})


//CUSTOMER ENDPOINTS
app.get('/customers/get_all', controller.getAllCustomers)
app.put('/customers/find_customer', controller.findCustomer)
app.post('/customers/create_new_customer', controller.createNewCustomer)

//INVENTORY ENDPOINTS
app.get('/inventory/get_pb_avail', controller.getAvailPB)
app.get('/inventory/get_kayaks_avail', controller.getAvailKayaks)
app.get('/inventory/get_lj_avail', controller.getAvailLifeJackets)
app.get('/inventory/get_rr_avail', controller.getAvailRoofRacks)

//RENTAL ENDPOINTS
app.get('/rentals/get_all_rentals', controller.getAllRentals)
app.get('/rentals/get_pending_quick', controller.getPendingQuick)
app.get('/rentals/get_active_count', controller.getActiveRentals)
app.get('/rentals/get_upcoming_due', controller.getUpcomingDue)
app.get('/rentals/get_past_due', controller.getPastDue)
app.get('/rentals/get_rental/:id', controller.getRentalInfo)
app.post('/rentals/create_new_rental', controller.createNewRental)
app.put('/rentals/find_rental', controller.findRental)
app.put('/rentals/confirm_checkout', controller.assignInventory)
app.put('/rentals/close_rental', controller.closeRental)


app.get('/rentals/get_pending_today', controller.getPendingToday)


let PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})