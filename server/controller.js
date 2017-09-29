module.exports = {
    //CUSTOMERS
    getAllCustomers: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.customers.getAllCustomers()
        .then(customers => res.status(200).send(customers))
        .catch(err => {res.status(500).send()})        
    },

    findCustomer: (req, res) => {
        const dbInstance = req.app.get('db');
        const {firstName, lastName, phone, email} = req.body;
        dbInstance.customers.findCustomer(firstName, lastName, phone, email)
        .then(customers => res.status(200).send(customers))
        .catch(err => {res.status(500).send()})        
    },

    checkCustomer: (req, res) => {
        const dbInstance = req.app.get('db');
        const {firstName, lastName, phone} = req.body;
        dbInstance.customers.customerChecker(firstName, lastName, phone)
        .then(customer => res.status(200).send(customer))
        .catch(err => {res.status(500).send()})
    },

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

    getAvailLifeJackets: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.inventory.getAvailPB()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})
    },

    getAvailRoofRacks: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.inventory.getAvailRoofRacks()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})
    },
    
    assignInventory: (req, res) => {
        const dbInstance = req.app.get('db');
        const {customer_id, rental_id, paddleboards, kayaks, roofracks, lifejackets} = req.body;
        dbInstance.rentals.assignInventory([customer_id, rental_id, paddleboards, kayaks, roofracks, lifejackets])
        .then(res.status(200).send('INVENTORY ASSIGNED'))
        .catch(err => {res.status(500).send()})
    },

    //RENTALS
    getAllRentals: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getAllRentals()
        .then(rentals => res.status(200).send(rentals))
        .catch(err => {res.status(500).send()})
    },

    findRental: (req,res) => {
        const dbInstance = req.app.get('db');
        const {firstName, lastName, phone, email, custID, dueDate} = req.body
        dbInstance.rentals.findRental(firstName, lastName, phone, email)
        .then(rentals => res.status(200).send(rentals))
        .catch(err => {res.status(500).send()})      
    },

    getActiveRentals: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getActiveRentals()
        .then(obj => res.status(200).send(obj))
        .catch(err => {res.status(500).send()})        
    },

    getPendingQuick: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getPendingQuickView()
        .then(obj => res.status(200).send(obj))
        .catch(err => {res.status(500).send()})
    },

    getUpcomingDue: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getUpcomingDue()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})        
    },

    getPastDue: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getPastDue()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})        
    },

    getUpcomingDue: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getUpcomingDue()
        .then(num => res.status(200).send(num))
        .catch(err => {res.status(500).send()})        
    },

    createNewRental: (req, res) => {
        const dbInstance = req.app.get('db');
        const {customerID, startDate, endDate, pbCount, kayakCount, roofRackCount, lifeJacketCount} = req.body;
        dbInstance.rentals.createRental([customerID, startDate, endDate, pbCount, kayakCount, roofRackCount, lifeJacketCount])
        .then(rental => res.status(200).send(rental))
        .catch(err => {res.status(500).send()})
    },

    getRentalInfo: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getRentalInfo(req.params.id)
        .then(rental => res. status(200).send(rental))
        .catch(err => {res.status(500).send()})
    },


    closeRental: (req, res) => {
        const dbInstance = req.app.get('db');
        const {rentalID} = req.body
        dbInstance.rentals.closeRental(rentalID)
        .then(rentals =>
            res.status(200).send(rentals))
        .catch(err => {res.status(500).send()})
    },


    getPendingToday: (req, res) =>{
        const dbInstance = req.app.get('db');
        dbInstance.rentals.getPendingRentals()
        .then(rentals => res.status(200).send(rentals))
        .catch(err => {res.status(500).send()})
    }
}
