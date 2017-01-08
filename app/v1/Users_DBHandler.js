
var users = require('../model/users'),
    bcryptjs = require('bcryptjs'),
    salt  = 8 ,
    jwt = require('jsonwebtoken');

function usersHandler (apiRoutes) {
    this.apiRoutes = apiRoutes;

    this.apiRoutes.post('/show',function (req,res) {
        req.assert('email','email is required').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            res.json({

                title : 'show something here',
                message : errors,
                error: true
            });
        }
        else{
            res.json({message : req.body.email, error: false});
        }
    });

    this.apiRoutes.post('/signup',function (req,res) {

        req.assert('email','email' + ' is required').notEmpty().withMessage('email is required').isEmail();
        req.assert('password','password'+ ' is required').notEmpty();
        req.assert('name', 'name' + ' is required').notEmpty();
        var errors = req.validationErrors();

        if(errors){
            res.json({

                error: true,
                message :errors

            });
        }else{
            var timeNow = new Date().getTime();
            var api_key = jwt.sign(req.body.email + timeNow, 'restful');
            var newObject = new users({
                email : req.body.email,
                password :bcryptjs.hashSync(req.body.password,salt),
                name : req.body.name,
                api_key : api_key,
                created_date :timeNow,
                updated_date : timeNow
            });
            newObject.signup(function (err,result ,message) {
                if(err){
                    res.json({
                        error : true,
                        message: message
                    })

                }else{
                    res.json({
                       error :false,
                        message : message,
                        data: {
                           user: result
                        }
                    });
                }

            });
        }
    });


    this.apiRoutes.post('/signin',function (req,res) {

        req.assert('email','email' + ' is required').notEmpty().withMessage('email is required').isEmail();
        req.assert('password','password'+ ' is required').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            res.json({
                error: true,
                message :errors
            });
        }else{

            var newObject = new users({
                email : req.body.email,
                password :bcryptjs.hashSync(req.body.password,salt),
            });
            newObject.signin(function (err,result ) {
                if(err){
                    res.json({
                        error : true,
                        message: 'Error occurred'
                    })
                }else{
                    var password = bcryptjs.compareSync(req.body.password,result.password);
                    if(password){
                        res.json({
                            error :false,
                            message : 'Signed in is successful',
                            data: {
                                user: result,
                                token : jwt.sign(result,'restful')

                            }
                        });
                    }else{
                        res.json({
                            error :true,
                            message : 'Signed in is failed'
                        });
                    }
                }
            });
        }
    });
}

module.exports = usersHandler;