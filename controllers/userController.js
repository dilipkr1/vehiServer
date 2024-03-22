
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Customer = require('../models/custmrModel')
const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY
const bcrypt = require('bcrypt');
const your_secret_key = 'mykey';
const OTP = require('../models/OtpModel')
const axios = require('axios')

const sendOtp = async (req, res) => {
  try {
    const mobileNumber = req.body.mobileNumber;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      params: {
        authorization: FAST2SMS_API_KEY,
        variables_values: `${otp}`,
        route: 'otp',
        numbers: mobileNumber
      }
    });
    if (response.data.return === false && response.data.status_code === 995) {
      return res.status(429).json({ success: false, message: 'Spamming detected. Please try again later.' });
    }
    res.status(200).json({ success: true, message: 'OTP sent successfully!' });
    await OTP.create({ mobileNumber, otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP.' });
  }
}



const verifyOtpAndStore = async (req, res) => {
  try {
    const { mobileNumber, enteredOtp } = req.body;
    console.log(mobileNumber, enteredOtp);
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const otpData = await OTP.findOne({ mobileNumber });
    if (!otpData) {
      return res.status(404).json({ success: false, message: 'No OTP found for the given mobile number.' });
    }

    if (enteredOtp !== otpData.otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }

    user.status = "1";
    await user.save();

    await OTP.deleteOne({ mobileNumber });

    res.status(200).json({ success: true, message: 'OTP verified and stored successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
  }
}


const Register = async (req, res) => {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingMobile = await User.findOne({ mobileNumber: req.body.phone });
    if (existingMobile) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      mobileNumber: req.body.phone,
      email: req.body.email,
      password: hashedPass,
      role: req.body.role
    });

    const user = await newUser.save();
    const newCusDetails = new Customer({
      userId: user._id,
      customerName: req.body.username,
      customerPhone: req.body.phone,
      customerEmail: req.body.email,
    });

    const customer = await newCusDetails.save();

    res.status(200).json({ message: "Successfully registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};




const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (isPasswordValid) {
        const token = jwt.sign({ userId: existingUser._id }, your_secret_key, { expiresIn: '30d' })
        res.json({ token, existingUser });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User Credential not found,SignUp and agin login" })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server err" })
  }
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, your_secret_key, (err, user) => {
      if (err) {
        console.error('Error verifying token:', err.message);
        return res.status(400).json({ success: false, message: err.message });
      }
      console.log('Decoded user ID:', user.id);
      req.userId = user.userId;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};


const getUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const customer = await Customer.find({ userId: userId });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ customer });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { Register, Login, verifyToken, getUser, sendOtp, verifyOtpAndStore };
