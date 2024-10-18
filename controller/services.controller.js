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
        status,
        jobDescription,
        scheduledTime,
        paymentMethod
    } = req.body;

    if(!sellerId || !status || !jobDescription || !scheduledTime
        || !paymentMethod){
        return res.status(400).json('Missing one of the fields !!!');
    }

    
    try{

        const seller = await Seller.findById(sellerId);
        if(!seller)
            return res.status(404).json({err : "Invalid Req, seller not available"});
    
        const isServiceAvailable = seller.servicesOffering.includes(jobDescription);

        if(!isServiceAvailable)
            return res.status(400).json({err : "The service is not available by this seller !!!"});

        const newService = new ServiceRequested({
            sellerId,
            status,
            jobDescription,
            scheduledTime,
            paymentMethod

        })

        await newService.save();
        res.status(200).json({success : true, newService})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({success : false, err : err});
    }
}



const getService =  async (req, res) => {

    const serviceId = req.params.id;

    if(!serviceId || !mongoose.Types.ObjectId.isValid(serviceId))
        return res.status(400).json({err : "Id missing or invalid !!!"})

    try{
        const service = await ServiceRequested.findById(serviceId);

        if(!service)
        {
            return res.status(404).json({success : false, err : "Service not available !!!"});
        }

        res.status(200).json({success : true, service});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }

}


const updateService = async (req, res) => {


    if (!updates || Object.keys(updates).length === 0) 
        return res.status(400).json({ success: false, err: "There is nothing to update!" });
    


    try
    {   
        const updatedService = await ServiceRequested.findByIdAndUpdate(serviceId, { $set : updates }, {new : true});

        if(!updatedService)
            return res.status(404).json({success : false, err : "service not updated or not service found !!!"});

        return res.status(200).json({success : true, updatedService});
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send(err);
    }
}

const deleteService =  async (req, res) => {

    const serviceId = req.params.id;
    
    if(!serviceId || !mongoose.Types.ObjectId.isValid(serviceId))
        return res.status(400).json({err : "Id missing or invalid !!!"})

    try{

        await ServiceRequested.findByIdAndDelete(serviceId);
        res.status(200).json({success : true, msg : 'Successfully deleted !!!'})

    }catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }

}

module.exports = {createService, getService, updateService, deleteService}