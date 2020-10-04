var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside get");
     req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM WorkOrder',function(err,rows) {
            
        if(err)
           console.log("Error Selecting : %s ",err );     
            res.render('pages/WorkOrder',{title:"Workorder - Node.js",data:rows, Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
       
    });   
});

/******************************Create WorkOrder*******************/
router.get('/CreateWorkorder', function(req, res, next) {
   var id=req.query.id;
  res.render('pages/CreateWorkorder', { title: 'Express',OpportunityID:id,Username:req.session.UserName,Usertype:req.session.Usertype});                  
});


/********************************Create WorkOrder save*******/

router.post('/CreateWorkorder',function(req,res,next)
            {
     var input = JSON.parse(JSON.stringify(req.body));
     var dt= new Date();
    dt=format(dt);
        req.getConnection(function (err, connection) {      
        var data = {
            
            OpportunityID     : input.txtOpp,
             WOTerms      : input.txtWoT,
             Remarks    : input.txtRem,
            WODate      : input.txtWoDt,
            WOAmount         : input.txtWoA,
            Status     :'New'
           
        };
            console.log(data); 
            
            /*****for incrementing****/ 
            var query = connection.query("Select Max(WOID) as workid from WorkOrder",function(err, rows)
        {
                
                if(rows[0].workid!=null)
                    {
                       var id=rows[0].workid;                    
                    id=id.substr(4,id.length);
                    id=parseInt(id)+1;
                    data.WOID="WRK/"+id;          
                    }
                else
                    {
                         data.WOID="WRK/100";   
                    }
       var query = connection.query("INSERT INTO WorkOrder set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/WorkOrder');
              
        });
            
        });            
        });
});

/****************function for formating date*****************************/
              function format(date) 
        {
                date = new Date(date);                
                var day = ('0' + date.getDate()).slice(-2);
                var month = ('0' + (date.getMonth() + 1)).slice(-2);
                var year = date.getFullYear();
                return year + '-' + month + '-' + day;
        }

/***********************Edit Workorder******************/
router.get('/EditWorkorder',function(req,res,next)
           {
      var id = req.query.id;
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM WorkOrder WHERE WOID = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/EditWorkorder',{title:"Edit Workorder - Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    }); 

/******************************Save Edit Workorder*********************/
router.post('/EditWorkorder',function(req,res,next)
            {
    var id=req.body.txtWoid;
    console.log(id);   
      var dt= new Date();
    dt=format(dt);
req.getConnection(function (err, connection) {

    var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            
         
            OpportunityID     : input.txtOpp,
            WODate      :format(input.txtdate),
            WOTerms       : input.txtWoT,
            WOAmount         : input.txtWoA,
            Remarks    : input.txtRem,
            
        };
        console.log(data);
       connection.query("UPDATE WorkOrder set ? WHERE WOID = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/WorkOrder');
          
        });
    });
});

/**************************GetWorkorderDetails***********/

router.get('/GetWorkorderDetails/', function(req,res)
    {
      
    var id=req.query.status;
 
   
      req.getConnection(function(err,connection){
      
      
           
                  var query=connection.query('SELECT * FROM WorkOrder WHERE   Status =?',[id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);
 console.log(query);
                 });
                 
              });
});
   


module.exports = router;

