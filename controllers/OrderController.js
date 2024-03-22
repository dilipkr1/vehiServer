const Order = require('../models/OrderModel')

const update_status = async (req, res) => {

    const myOrderID = req.params.id;
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: myOrderID },
            { status: status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
    }
    catch (error) {
        console.error("Error updating status", error)
        res.status(500).json({ message: 'Failed to update order status' });
    }
}
const post_checkout = async (req, res) => {
    try {
        const { userId, orderId, subTotal, totalDiscount, cartItems } = req.body;

        const newOrder = new Order({
            userId: userId,
            orderId: orderId,
            subTotal: subTotal,
            totalDiscount: totalDiscount,
            cartItems: cartItems,
        });
        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const get_checkout = async (req, res) => {
    try {
        const cartItems = await Order.find();
        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'No cart items found' });
        }
        res.status(200).json({ message: 'Cart items retrieved successfully', cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const get_user_orders = async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId)
        const userOrders = await Order.find({ userId: userId });
        res.status(200).json({ success: true, data: userOrders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};



module.exports = { post_checkout, get_checkout, get_user_orders, update_status }