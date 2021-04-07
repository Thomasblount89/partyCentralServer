const { UniqueConstraintError } = require('sequelize/lib/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {models} = require('../models');
const router = require('express').Router();

//register 
router.post("/register", async (req, res) => {
    const { firstName,
        lastName,
        email,
        password,
        role
    } = req.body;

    try {
        const newUser = await models.UserModel.create(
            {
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, 10),
                role
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
        loginUser = await models.UserModel.findOne ({
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
            message: 'Error logging in!'
        });
    }
})

// get user by all
router.get('/', async (req, res) => {
 
    try{
         const allUsersInfo = await models.UserModel.findAll({});
        
     res.status(200).json({
        user: allUsersInfo
     })

    } catch (err) {
        res.status(500).json ({
            message:`Failed to retrieve allUsersInfo: ${err}`
        })
    }
})

// get user by Id
router.get('/id/:id', async (req, res) => {
 
    try{
         const host = await models.UserModel.findAll({
            where: {
                id: req.params.id// make sure property name matches the database column title. 
            }
        });
        
     res.status(200).json({
        user: host
     })

    } catch (err) {
        res.status(500).json ({
            message:`Failed to retrieve ID: ${err}`
        })
    }
})

// get user by name
router.get('/name/:firstName', async (req, res) => {
 
    try{
         const host = await models.UserModel.findAll({
            where: {
                firstName: req.params.firstName,
                // lastName: req.params.lastName
                // make sure property name matches the database column title. 
            }
        });
        
     res.status(200).json({
       
        user: host
  
     })

    } catch (err) {
        res.status(500).json ({
            message:`Failed to retrieve ID: ${err}`
        })
    }
})

    


module.exports = router;
