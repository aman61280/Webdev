const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');


router.get('/user/:userId/cart', isLoggedIn, async (req, res) => {

    try {
        const user = await User.findById(req.params.userId).populate('cart');
        res.render('cart/showCart', { userCart: user.cart });
    }
    catch (e) {
        req.flash('error', 'Unable to get the cart');
        res.redirect('/error');
    }



})

router.post('/user/:id/cart', isLoggedIn, async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        const user = req.user;
        user.cart.push(product);

        await user.save();

        req.flash('success', 'Added to cart successfully');
        res.redirect(`/user/${req.user._id}/cart`);

    }
    catch (e) {
        req.flash('error', 'Unable to add to cart');
        res.redirect('/error');

    }


})


router.delete('/user/:userId/cart/:id', async (req, res) => {

    const { userId, id } = req.params;

    await User.findByIdAndUpdate(userId, { $pull: { cart: id } });
    req.flash('success', 'Product deleted from cart successfully');
    res.redirect(`/user/${req.user._id}/cart`);
})



module.exports = router;
