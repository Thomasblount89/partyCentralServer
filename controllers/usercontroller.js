const { UniqueConstraintError } = require('sequelize/lib/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models');
const router = require('express').Router();

// get user by ID
router.get('/:id', async (req, res) => {
    try{
        const userId = await UserModel.findAll({
            where: {
                id:req.params.id// make sure property name makes the database column title. 
            }
        });
        
     res.status(200).json(userId)
    } catch (err) {
        res.status(500).json ({
            message:`Failed to retrieve ID: ${err}`
        })
    }
})

//register 
router.post("/register", async (req, res) => {
    const { firstName,
        lastName,
        email,
        password
    } = req.body;

    try {
        const newUser = await UserModel.create(
            {
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, 10),
            });

        const token = jwt.sign({
            id: newUser.id,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24,
            }
        );

        res.status(201).json({
            message: "User registered!",
            user: newUser,
            token,

        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {

            res.status(500).json({
                error: 'Failed to register user: ${err}',
            });
        }
    }
});

// login
router.post('/login', async (req,res) => {
    const {
        email,
        password
    } = req.body;

    try {
        let loginUser = await UserModel.findOne ({
            where: {
                email
            }
        });
    if (loginUser) {
        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison) {
            let token = jwt.sign({
                id: loginUser.id
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: 60*60*24
            }
            );

            res.status(200).json({
                // user: loginUser,
                message: "User successfully logged in!",
                token
            });
        }
        }else{
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error loggin in!'
        });
    }
})
    


module.exports = router;
