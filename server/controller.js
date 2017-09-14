module.exports = {
    //CUSTOMERS
    createNewCustomer: (req, res) => {
        const dbInstance = req.app.get('db');
        const {firstName, lastName, email, phone, address, city, state, zip} = req.body;
        dbInstance.customers.createCustomer(firstName, lastName, email, phone, address, city, state, zip)
        .then(customer => res.status(200).send(customer))
        .catch(err => {res.status(500).send()})
    },

    //INVENTORY
    getAvailPB: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.inventory.getAvailPB()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})
    },

    getAvailKayaks: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.inventory.getAvailKayaks()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})
    },

    //RENTALS
    getActiveRentals: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getActiveRentals()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})        
    },

    createNewRental: (req, res) => {
        const dbInstance = req.app.get('db');
        const {customerID, startDate, endDate, pbCount, kayakCount} = req.body;
        dbInstance.rentals.createRental(customerID, startDate, endDate, pbCount, kayakCount)
        .then(rental => res.status(200).send(rental))
        .catch(err => {res.status(500).send()})
    },

    getRentalInfo: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getRentalInfo(req.params.id)
        .then(rental => res. status(200).send(rental))
        .catch(err => {res.status(500).send()})
    },

    assignInventory: (req, res) => {
        const dbInstance = req.app.get('db');
        const {customer_id, rentalID, paddleboards, kayaks} = req.body;
        dbInstance.rentals.assignInventory(customer_id, rentalID, paddleboards, kayaks)
        .then(res.status(200).send('INVENTORY ASSIGNED'))
        .catch(err => {res.status(500).send()})
    },

    closeRental: (req, res) => {
        const dbInstance = req.app.get('db');
        const {rentalID} = req.body
        dbInstance.rentals.closeRental(rentalID)
        .then(res.status(200).send(`Rental ${rentalID} has been closed!`))
        .catch(err => {res.status(500).send()})
    }

}