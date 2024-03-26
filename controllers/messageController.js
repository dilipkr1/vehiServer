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
    const username = "7852010838";
    const password = "admin";
    const key = req.body.key;
    const numbers = req.body.number;

    if (!username || !password) {
        res.status(500).json({ error: "Username or password not provided" });
        return;
    }

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
            // Handle non-OK responses
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const responseData = await response.text();
        if (responseData === "OK") {
            res.status(200).json({ message: "API call successful" });
            return;
        } else {
             res.status(500).json({ error: "Unexpected response from server" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};


module.exports = { post_message, post_call }
