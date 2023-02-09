const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const { JsonWebTokenError } = require('jsonwebtoken');

const SECONDS_TO_EXPIRE = 36000;
const USER_ALREADY_EXISTS_ERROR = 'User already exists';
const NAME = 'name';
const EMAIL = 'email';
const PASSWORD = 'password';
const SERVER_ERROR = 'server error';
const MIN_PASSWORD_LENGTH = 6;

//TODO
/**
 * 1. Change user 
 */

router.post('/', [
    check( NAME, 'Name is required').not().isEmpty(),
    check( EMAIL, 'Please include a valid email').isEmail(),
    check( PASSWORD, 'Please enter a password with 6 or more characters').isLength({ min:MIN_PASSWORD_LENGTH})
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{msg: USER_ALREADY_EXISTS_ERROR }]});
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: SECONDS_TO_EXPIRE },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );


    }
    catch(err) {
        console.error(err.message);
        res.status(500).send(SERVER_ERROR);
    }
  }
);

module.exports = router;
