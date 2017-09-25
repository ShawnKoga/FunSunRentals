import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Create_Rental from './components/Rentals/Create_Rental'
import CloseRental from './components/Rentals/CloseRental'
import Create_Customer from './components/Customers/Create_Customer';
import Add_Inventory from './components/Inventory/Add_Inventory';
import CheckoutInventory from './components/Rentals/CheckoutInventory';
import Customer_Lookup from './components/Customers/Customer_Lookup';

export default(
    <Switch>
       <Route path='/login' component={ Login } />
       <Route path='/dashboard' component={ Dashboard } />
       <Route path='/new_rental' component={ Create_Rental } />
       <Route path='/checkout_inventory' component={ CheckoutInventory } />
       <Route path='/close_rental' component={ CloseRental } />
       <Route path='/new_customer' component={ Create_Customer } />
       <Route path='/add_inventory' component={ Add_Inventory } />
       <Route path='/customer_lookup' component={ Customer_Lookup } />
    </Switch>
)