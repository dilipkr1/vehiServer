const Messages = require('../models/messageModel');
const axios = require('axios')


// const post_message = async (req, res) => {
//     try {
//         const { selectedReason } = req.body;

//         const newSelectedReason = new Messages({
//             selectedReason
//         });

//         await newSelectedReason.save();

//         res.status(200).json({ message: 'Selected reason saved successfully', newSelectedReason });
//     } catch (error) {
//         console.error('Error saving selected reason:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


const post_message = async (req, res) => {
    const { message, numbers } = req.body;

    const headers = {
        Authorization: process.env.FAST2SMS_API_KEY,
    };
    try {
        const response = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "q",
                message: message,
                flash: 0,
                numbers: numbers,
            },
            { headers: headers }
        );

        if (response.status === 200) {
            console.log("Message sent successfully");
            res.status(200).send("Message sent successfully");
        } else {
            throw new Error("Failed to send message");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while sending the message");
    }
}





const post_call = async (req, res) => {
    const username = process.env.USERNAME
    const password = process.env.PASSWORD
    const key = req.body.key;
    const numbers = req.body.number;

    const auth = btoa(`${username}:${password}`);
    const url = "https://telephonycloud.co.in/api/v1/mask";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                key: key,
                number: numbers,
                "max-call-duration": 900,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to call API");
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

module.exports = { post_message, post_call }
