require('dotenv').config();

const express = require('express')
, bodyParser = require('body-parser')
, massive = require('massive')
, session = require('express-session')
, cors = require('cors');

const app = express();
const controller = require('./controller')

app.use(bodyParser.json());
app.use(cors())

//DATABASE CONNECTION
massive(process.env.CONNECTIONSTRING).then(db => {
    app.set('db', db);
})

//CUSTOMER ENDPOINTS
app.post('/customers/create_new_customer', controller.createNewCustomer)

//INVENTORY ENDPOINTS
app.get('/inventory/get_pb_avail', controller.getAvailPB)
app.get('/inventory/get_kayaks_avail', controller.getAvailKayaks)

//RENTAL ENDPOINTS
app.get('/rentals/get_active_count', controller.getActiveRentals)
app.get('/rentals/get_rental/:id', controller.getRentalInfo)
app.post('/rentals/create_new_rental', controller.createNewRental)
app.put('/rentals/confirm_checkout', controller.assignInventory)
app.put('/rentals/close_rental', controller.closeRental)


let PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})