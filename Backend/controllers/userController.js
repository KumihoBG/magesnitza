const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middleware/auth');

const {
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    addNewUser } = require('../services/userService');

router.get('/', async (req, res) => {
    try {
        const products = await getAllUsers();

        if (!products) {
            res.status(404).json({
                message: 'No products found'
            });
        } else {
            res.status(200).json(products);
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const currentProduct = await getUserById(req.params.id);
        if (!currentProduct) {
            res.status(404).json({
                message: 'Product not found'
            });
        } else {
            res.status(200).json(currentProduct);
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
});

router.put('/update/:id', verifyAccessToken, async (req, res) => {
    const id = req.params.id;

    const userData = {
        email: req.body.email.trim(), 
        password: req.body.password.trim(), 
        role: req.body.role
    }

    if (req.body) {
        try {
            const updatedUser = await updateUser(id, userData);

            if (!updatedUser) {
                res.status(404).json({
                    message: 'User not updated'
                });
            } else {
                res.status(200).json(updatedUser);
            }
        } catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    };
});

router.post('/add', verifyAccessToken, async (req, res) => {
    
    const userData = {
        email: req.body.email.trim(), 
        role: 'user'
    }

    if (req.body) {
        try {
            const createdUser = await addNewUser(userData);

            if (!createdUser) {
                res.status(404).json({
                    message: 'User not created'
                });
            } else {
                res.status(200).json(createdUser);
            }
        } catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    };
});

router.delete('/delete/:id', verifyAccessToken, async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.id);

        if (!deletedUser) {
            res.status(404).json({
                message: 'User not deleted'
            });
        } else {
            res.status(200).json(deletedUser);
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
});

module.exports = router;