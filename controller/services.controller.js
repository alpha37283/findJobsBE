const express = require('express')
const { default: mongoose } = require('mongoose');


const ServiceRequested = require('../models/services_req.model.js');
const Seller = require('../models/user_info.model.js');

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());



// POST /services: Create a new service request.
// GET /services/:id: Fetch details of a service request by ID.
// PUT /services/:id: Update the status of a service request.
// DELETE /services/:id: Remove a service request.



const createService = async (req, res) => {
    const {
        sellerId,
        buyerId,
        buyerName,
        serviceRequested,
        status,
        jobDescription,
        scheduledTime,
        price,
        paymentMethod,
        address,
        contactNumber
    } = req.body;

    if (!sellerId || !status || !jobDescription || !scheduledTime || !price
        || !paymentMethod || !address || !contactNumber || !buyerName || !serviceRequested) {
        return res.status(400).json('Missing one of the fields !!!');
    }

    try {
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ err: "Invalid Req, seller not available" });
        }

        const newService = new ServiceRequested({
            sellerId,
            buyerId,
            buyerName,
            serviceRequested,
            status,
            jobDescription,
            scheduledTime,
            price,
            paymentMethod,
            address,
            contactNumber,
            requestCreatedAt: new Date(), // Explicitly set creation time
        });

        await newService.save();
        res.status(200).json({ success: true, newService });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, err: err });
    }
};

const getService = async (req, res) => {
    const sellerId = req.params.id;

    if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
        return res.status(400).json({ err: "Id missing or invalid !!!" });
    }

    try {
        const services = await ServiceRequested.find({ sellerId }).sort({ requestCreatedAt: -1 }); // Sort by creation time

        if (!services || services.length === 0) {
            return res.status(404).json({ success: false, err: "No services found for this seller!" });
        }

        res.status(200).json({ success: true, services });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err: err.message });
    }
};

const updateService = async (req, res) => {
    const serviceId = req.params.id;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ success: false, err: "There is nothing to update!" });
    }

    // Add timestamp to track the last update
    updates.requestUpdatedAt = new Date();

    try {
        const updatedService = await ServiceRequested.findByIdAndUpdate(
            serviceId,
            { $set: updates },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ success: false, err: "Service not updated or not found !!!" });
        }

        return res.status(200).json({ success: true, updatedService });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};

const deleteService = async (req, res) => {
    const serviceId = req.params.id;

    if (!serviceId || !mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(400).json({ err: "Id missing or invalid !!!" });
    }

    try {
        await ServiceRequested.findByIdAndDelete(serviceId);
        res.status(200).json({ success: true, msg: 'Successfully deleted !!!' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = { createService, getService, updateService, deleteService };
