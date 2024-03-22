
const express = require('express');
const app = express()
const router = express.Router();
const BusinessDetail = require('../models/settingdataModel')
const SocialMediaSettings = require('../models/socialmedia')

// const multer = require("multer")
// const path = require('path') 
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });
// app.use('/images', express.static(path.join(__dirname, '../images')));
//  upload.single('businessImage'),                


router.post("/businessDetails", async (req, res) => {
    try {
        const newDetails = new BusinessDetail({
            businessName: req.body.businessName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            bio: req.body.bio,
        });
        const details = await newDetails.save();
        console.log(details)
        res.status(200).json(details);
    } catch (error) {
        console.error('Error saving customer details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.post('/social-media', async (req, res) => {
//     try {
//         const { twitter, linkedin, instagram, facebook, android, ios } = req.body;

//         const socialMediaSettings = new SocialMediaSettings({
//             twitter,
//             linkedin,
//             instagram,
//             facebook,
//             android,
//             ios,
//         });

//         const savedSocialMediaSettings = await socialMediaSettings.save();

//         res.status(201).json(savedSocialMediaSettings);
//     } catch (error) {
//         console.error('Error creating social media settings:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })


router.put('/social-media', async (req, res) => {
    try {
        const { twitter, linkedin, instagram, facebook, android, ios } = req.body;

        const updatedSocialMediaSettings = await SocialMediaSettings.findByIdAndUpdate("65f968f314979e1b518fd0e5", {
            twitter,
            linkedin,
            instagram,
            facebook,
            android,
            ios,
        }, { new: true });

        res.status(200).json(updatedSocialMediaSettings);
        const x = await updatedSocialMediaSettings.save();

    } catch (error) {
        console.error('Error updating social media settings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})



router.put("/businessDetails/", async (req, res) => {
    try {
        const existingBusinessDetails = await BusinessDetail.findById("65f95d5dcb73b42d6f3844e8");
        if (!existingBusinessDetails) {
            return res.status(404).json({ message: "Business details not found" });
        }

        existingBusinessDetails.businessName = req.body.businessName;
        existingBusinessDetails.email = req.body.email;
        existingBusinessDetails.phone = req.body.phone;
        existingBusinessDetails.address = req.body.address;
        existingBusinessDetails.bio = req.body.bio;

        const updatedBusinessDetails = await existingBusinessDetails.save();

        res.status(200).json(updatedBusinessDetails);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.message });
        }
        console.error('Error updating business details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get("/businessDetails", async (req, res) => {
    try {
        const settingData = await BusinessDetail.find();
        res.status(200).json(settingData);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/social-media', async (req, res) => {
    try {
        const socialMediaSettings = await SocialMediaSettings.findOne();

        if (!socialMediaSettings) {
            return res.status(404).json({ message: 'Social media settings not found' });
        }

        res.status(200).json(socialMediaSettings);
    } catch (error) {
        console.error('Error fetching social media settings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;