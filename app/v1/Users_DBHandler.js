/**
 * Created by phong on 12/18/16.
 */


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

}

module.exports = usersHandler;