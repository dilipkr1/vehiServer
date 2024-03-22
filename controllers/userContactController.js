const FamilyContact = require('../models/userPhone')
const Customer = require('../models/custmrModel')

const updateFamilyContact = async (req, res) => {
    try {
        const { phone1, phone2, userId } = req.body;
        let user = await Customer.findOne({ userId: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.phone1 = phone1;
        user.phone2 = phone2;
        const updatedUser = await user.save();
        res.status(200).json({ message: "Family contact updated successfully", data: updatedUser });
    } catch (error) {
        console.error('Error updating family contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { updateFamilyContact }