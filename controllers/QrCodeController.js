const QRCode = require('../models/qrcode');

const verifyQRCodeUID = async (req, res) => {
    const { uid } = req.body;

    try {
        const qrCode = await QRCode.findOne({ uid });

        if (qrCode) {
            const customerNumbers = qrCode.customerNumbers;
            res.status(200).json({ success: true, customerNumbers });
        } else {
            res.status(404).json({ success: false, message: 'UID not found' });
        }
    } catch (error) {
        console.error('Error verifying QR code UID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    verifyQRCodeUID,
};
