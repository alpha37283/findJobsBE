// POST /sellers/register: Register a new seller.
// POST /sellers/login: Authenticate seller login.
// GET /sellers/:id: Fetch seller profile by ID.
// PUT /sellers/:id: Update seller information.
// DELETE /sellers/:id: Delete seller account


const express = require('express')
const app = express();

const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');

const Seller = require('../models/user_info.model.js');

app.use(express.urlencoded({extended : true}));
app.use(express.json());


const createSeller = async (req, res) => {
    const {name, email, password, servicesOffering, location, rating, bio} = req.body;

    const existSeller = await Seller.findOne({ email: email });
    if(existSeller)
    {
        console.log('User exists')
        return res.status(400).json({success : false, err : 'Seller Already Exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed Success')

    const newSeller = new Seller({
        name,
        email,
        password : hashedPassword,
        servicesOffering,
        location,
        rating,
        bio
    })


    try{
        await newSeller.save();
        res.status(200).json({success : true, seller : newSeller})
        console.log('Seller Registered!!!')
    }
    catch(err)
    {
        console.log('An error occured while adding user' , err);
        res.status(500).json({success : false, err :  err})
    }
    
}


const getSeller = async (req, res) => {
    const {id} = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'Invalid or missing seller ID' });
    }

    try{
        const seller = await Seller.findById({_id : id});

        if(!seller)
        {
            console.log('No seller found !!!')
            return res.status(404).json({err : 'No Seller found'});
            
        }

        const { password, ...sellerInfo } = seller.toObject();

        return res.status(200).json({success : true, sellerInfo});
    }
    catch(err)
    {
        console.log('An error occured !!!');
        res.status(500).json('Error occured : ', err);
    }
}


const updateSeller = async (req, res) => {

    const {id} = req.params;
    const updates = req.body;

    if(!id || !mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({err : 'Invalid id or missing id'})
    }

    try{
        const updatedSeller = await Seller.findByIdAndUpdate(id , {$set : updates}, {new : true});

        if (!updatedSeller)
        {
            console.log('Seller not found !!!');
            return res.status(404).json({err : 'User not found !!!'})
        }

        const {password, ...seller} =  updatedSeller.toObject();
        
        console.log(seller);

        return res.status(200).json({success : true, seller})

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ success: false, error: 'An internal server error occurred' })
    }

}

const deleteSeller = async (req, res) => {
    const {id} = req.params;
    
    if(!id || !mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({err : "Invalid or missing id !!!"})
    }

    try{
        const deletedSeller = await Seller.findByIdAndDelete(id);

        if(!deletedSeller)
        {
            return res.status(404).json({success : false, err : 'User not found !!!'});
        }

       // const {password, ...seller} = deletedSeller.toObject();

        res.status(200).json({success : true, msg : 'Seller successfully deleted !!!'});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({err : err});
    }

}

module.exports = {createSeller, getSeller, updateSeller, deleteSeller};