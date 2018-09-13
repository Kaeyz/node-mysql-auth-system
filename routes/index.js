const router = require('express').Router();
 
router.get('/', (req, res) => {
    let message =  '';
    res.render('index', {message})
});

router.get('/login', (req, res) => {
    let message = '';
    res.render('index', {message})
})

// call for signup
router.get('/signup', (req, res) => {
    let message ="";
    res.render('signup', {message})
});

router.post('/signup', (req, res) => {
    let message = '';
    let session = req.session;

    if(req.method == "POST") {
        let post = req.body;
        let name = post.user_name;
        let pass = post.password
        let fname = post.first_name
        let lname = post.last_name
        let mob = post.mob_no
        
        let sql = "INSERT INTO `users` (`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "');"
        
        let query = db.query(sql, (err, result) => {
            if (err) {
            message = err;
            retrun    
            }
            message = 'Succesfully! Your account has been created'
            res.render('signup.ejs', {message})
        })
    }
})


router.post('/login', (req, res) => {
    let message = '';
    let session = req.expressSession; 
 
    if(req.method == "POST"){
       let post  = req.body;
       let name= post.user_name;
       let pass= post.password;
      
       let sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.user = results[0];
              console.log(results[0].id);
              res.redirect('/home/dashboard');
            
          }
          else{
             message = 'Wrong Credentials.';
             res.render('index.ejs',{message: message});
          }
                  
       });
    } else {
       res.render('index.ejs',{message: message});
    }         

})

router.get('/home/dashboard', (req, res, next) => {
    let user = req.session.user;
    let userId = req.session.userId;

    if(userId == null) {
        res.redirect('/login');
        return;
    }
    let sql = "SELECT * FROM `login_details` WHERE `id`='"+userId+"'";

    db.query(sql, function(err, results) {
        console.log(user);
        res.render('profile', {user} )
    })
})

router.post('/logout', (req, res) => {
    let message = ''
   req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            message = err
           return res.redirect('back', {message})
        }
        message = 'logout Successful'
        res.redirect('/login', {message})
     })
})


module.exports = router