const Messages = require('../models/messageModel');

const post_message = async (req, res) => {
    try {
        const { selectedReason } = req.body;

        const newSelectedReason = new Messages({
            selectedReason
        }); 
        
        await newSelectedReason.save();

        res.status(200).json({ message: 'Selected reason saved successfully', newSelectedReason });
    } catch (error) {
        console.error('Error saving selected reason:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { post_message }
