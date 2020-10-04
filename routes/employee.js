var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside get");   
  res.render('pages/Home', { title: 'Express' });
});

/*******************************Login Page******************************/

router.get('/login',function(req,res,next){
    console.log("inside get");
    res.render('pages/login',{title: 'Express', message:""});
});

/*********************Login Post****************************************/
router.post('/login',validate);

function validate(req,res)
{
    var emp=req.body.username;
var pswd=req.body.password;
req.getConnection(function(err,connection){  
var query = connection.query("SELECT * FROM employee where Empid=? and Password=? and Status='Available'",[emp,pswd],function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
			console.log(rows);   
         if(rows.length>=1)
             {
                 req.session.Empid=rows[0].Empid;
                 req.session.UserName=rows[0].EmpName;
                 req.session.Usertype=rows[0].UserType;
                 
                 if(rows[0].UserType=='Admin')
                     {
                         res.redirect('/User');
                     }
                 else if(rows[0].UserType=='BDE')
                     {
                         res.redirect('/lead');
                     }
                 else if(rows[0].UserType=='Manager')
                     {
                         res.redirect('/lead/ManagerLeads');
                     }
             }
        else 
            {
                res.render('pages/login',{message:"Invalid UserId/Password"});
            }
         });              
    }); 

	     
 }
/***************************User Details page************************/
router.get('/User',function(req,res,next)
           {
      
   req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM employee where Status="Available"',function(err,rows) {
            
        if(err)
           console.log("Error Selecting : %s ",err );     
            res.render('pages/User',{title:"Users - Node.js",data:rows, Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
       
    });
   
});

router.get('/GetUserstatus',function(req,res)
           {
      var status=req.query.Status;
   req.getConnection(function(err,connection){
       
     var query=connection.query('SELECT * FROM employee where Status Like "'+status+'%"',function(err,rows) {
           
        if(err)
           console.log("Error Selecting : %s ",err );     
           res.json(rows);
                         
         });
       
    });
   
});

/********************************New User Page*********************/
router.get('/NewUser',function(req,res,next)
           {
    
        res.render('pages/NewUser',{title:"Edit User - Node.js",Username:req.session.UserName,Usertype:req.session.Usertype});                 
    
                 
    }); 

module.exports = router;
/******************************Save New User**************************/
router.post('/NewUser',function(req,res,next)
            {
     var input = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection) {      
        var data = {
            
            EmpName  : input.txtName,
            Password    : input.txtPswd,
            Designation  : input.ddType,
            Email : input.txtEmail,
             Phone: input.txtMobile,
            DOJ  : input.txtDate,
             UserType : input.ddlType,
            Status:'Available'
        };
            /************Generate Primary key*****************************/
  
		console.log(data);
            var query = connection.query("Select Max(Empid) as Empid from employee",function(err, rows)
        {
           var id=rows[0].Empid;
        //console.log("Value is "+id);
        id=id.substr(4,id.length);
        id=parseInt(id)+1;
        data.Empid="EMP/"+id;          
        var query = connection.query("INSERT INTO employee set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/User');
              
        });  
		    });	
   
});
});

/******************************Edit User**********************************/
router.get('/EditUser/',function(req,res,next)
           {
      var id = req.query.id;
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM employee WHERE Empid = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/EditUser',{title:"Edit User - Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    }); 
/***************************************Save Edit User*********************/
router.post('/EditUser/',function(req,res,next)
            {
    var id=req.body.txtEmpid;
    console.log(id);
req.getConnection(function (err, connection) {

    var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            
         
            Empid:input.txtEmpid,
            EmpName : input.txtname,
            Password: input.txtPassword,
            Designation   : input.ddType,
            Email  : input.txtEmail,
            Phone  :input.txtMobile,
            DOJ    :input.txtDate,
            UserType:input.ddlType,
            Status:input.ddlStat
            
        
        };
        
        connection.query("UPDATE employee set ? WHERE Empid = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/User');
          
        });
    
    });
});

/*******************************Delete User***********************/

router.get('/DeleteUser/',function(req,res,next)
           {
      var id = req.query.id;
    req.getConnection(function(err,connection)
  {
       
     connection.query("UPDATE employee set Status='NA' WHERE Empid = ? ",[id], function(err, rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     res.redirect('/User');
            
                           
         });
                 
    });                              
    }); 
/***********************************User Profile**************************/
router.get('/MyProfile',function(req,res,next)
           {
    var id = req.session.Empid;
    req.getConnection(function(err,connection)
        {
        connection.query("SELECT * FROM employee WHERE Empid = ?",[id],function(err,rows)
                         {
            if(err)
                console.log("Error Selecting : %s",err);
            res.render('pages/Myprofile',{title:"Myprofile",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
        });
    });
});

/**************************save user***********************************/
router.post('/MyProfile',function(req,res,next)
            {
    
    
req.getConnection(function (err, connection) {

    var input = JSON.parse(JSON.stringify(req.body));
    var password='';
   
     if(req.body.txtnewpswd!="")
        {
           password= input.txtnewpswd;
        }
    else
        {
            password=input.txtPassword;
        }
  
        var data = {
            
         
            Empid:input.Empid,
            Password:password,
            EmpName : input.txtname,           
            Designation   : input.txtdesg,
            Email  : input.txtemail,
            Phone  :input.txtphone,
            DOJ    :input.txtdoj,
            UserType:input.ddlType,
            Status:input.ddlStat
        };
     password='';
        //console.log(data);
        connection.query("UPDATE employee set ? WHERE Empid = ? ",[data,input.Empid], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/MyProfile');
          
        });
    
    });
    
});
