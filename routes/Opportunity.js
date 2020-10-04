var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var usertype= req.session.Usertype;
    var empid= req.session.Empid;
    console.log("inside get");
     req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM Opportunity WHERE CreatedBy="'+empid+'"',function(err,rows) {
            
        if(err)
           console.log("Error Selecting : %s ",err );     
            res.render('pages/Opportunity',{title:"Opportunity - Node.js",data:rows, Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
       
    });   
});

router.get('/AddOpportunity', function(req, res, next) {
   var id=req.query.id;
  res.render('pages/AddOpportunity', { title: 'Express',AccountName:id,Username:req.session.UserName,Usertype:req.session.Usertype});                  
});

/********************************Save Leads***************************/

router.post('/AddOpportunity',function(req,res,next)
            {
    console.log("inside post");  
     var input = JSON.parse(JSON.stringify(req.body));
     var dt= new Date();
    dt=format(dt);
        req.getConnection(function (err, connection) {      
        var data = {
            
            AccountName     : input.txtAcnt,
            AccountType      : input.txtActyp,
            Contracttype       : input.txtCon,
            ServiceType         : input.txtService,
            EstimatedValue    : input.Estval,
            EstimatedClosDate        : input.EstClosdt,
            EstimatedDuration          : input.EstDur,
            Practice        :input.txtPrac,
            SalesStage :input.txtMobile,
            Des    :input.txtDes,
            CreatedBy      :req.session.Empid,
            CreatedOn      :dt,
            ModifiedOn     :dt,
            ModifiedBy     :req.session.Empid
            
            
        };
            console.log(data);  
            var query = connection.query("Select Max(OpportunityID) as Oppid from opportunity",function(err, rows)
        {console.log("1"+rows[0].Oppid);
                if(rows[0].Oppid!=""|| rows[0].Oppid!=null)
                    {
                       var id=rows[0].Oppid;                    
                    id=id.substr(4,id.length);
                    id=parseInt(id)+1;
                    data.OpportunityID="OPP/"+id;          
                    }
                else
                    {
                         data.OpportunityID="OPP/100";   
                    }
        var query = connection.query("INSERT INTO opportunity set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/Opportunity');
              
        });    });         
            
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



/*****************************Edit Opportunity*************************/
router.get('/EditOpportunity',function(req,res,next)
           {
      var id = req.query.id;
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM opportunity WHERE OpportunityID = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/EditOpportunity',{title:"Edit Opportunity - Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    }); 


/******************************Save Edit Opportunity*********************/
router.post('/EditOpportunity',function(req,res,next)
            {
    var id=req.body.txtOpid;
    console.log(id);   
      var dt= new Date();
    dt=format(dt);
req.getConnection(function (err, connection) {

    var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            
         
            AccountName     : input.txtAcnt,
            AccountType      : input.txtActyp,
            Contracttype       : input.txtCon,
            ServiceType         : input.txtService,
            EstimatedValue    : input.Estval,
            EstimatedClosDate        : format(input.EstClosdt),
            EstimatedDuration          : input.EstDur,
            Practice        :input.txtPrac,
            SalesStage :input.txtSales,
            Des    :input.txtDes,
            CreatedBy      :input.txtcrtBy,
            CreatedOn      :format(input.txtcrtOn),
            ModifiedOn     :dt,
            ModifiedBy     :req.session.Empid
            
            
            
        
        };
        console.log(data);
       connection.query("UPDATE opportunity set ? WHERE OpportunityID = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/Opportunity');
          
        });
    });
});

/************************************Opportunity Details**************/
router.get('/OpportunityDetails',function(req,res,next)
           {
      var id = req.query.id;
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM Opportunity WHERE OpportunityID = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/OpportunityDet',{title:"Opportunity Details- Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    }); 

/**************************Manager Opportunity**********************/

router.get('/ManagerOpportunities',function(req,res,next)
           {
     
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM opportunity',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/ManagerOpportunity',{title:"Opportunity- Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    });
/**************************Admin Opportunity**********************/

router.get('/AdminOpportunities',function(req,res,next)
           {
     
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM opportunity',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/AdminOpportunity',{title:"Opportunity- Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    });

/************************Search Opportunity****************/
router.get('/GetAccountTypeDetails/', function(req,res)
    {
      
    var id=req.query.acctype;
    var usertype= req.session.Usertype;
    var empid= req.session.Empid;
      req.getConnection(function(err,connection){
      
          if(usertype=="BDE")
              {
                  var query=connection.query('SELECT * FROM Opportunity WHERE CreatedBy=? and AccountType =?',[empid,id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
                 
              }
          else
              {
                var query=connection.query('SELECT * FROM Opportunity WHERE AccountType=?',[id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
              }
   
          console.log(query);
       
    });   
})

router.get('/GetDateDetails/', function(req,res)
    {
      
    var id=req.query.frmdate;
    var dateid=req.query.todate;
    var usertype= req.session.Usertype;
        var empid= req.session.Empid;
      req.getConnection(function(err,connection){
      
          if(usertype=="BDE")
              {
                  var query=connection.query('SELECT * FROM Opportunity WHERE CreatedBy=? and CreatedOn>=? and CreatedOn<=?',[empid,id,dateid],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
                 
              }
          else
              {
                var query=connection.query('SELECT * FROM Opportunity WHERE  CreatedOn>=? and CreatedOn<=?',[id,dateid],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
              }
   
          console.log(query);
       
    });   
})

router.get('/GetServiceTypeDetails/', function(req,res)
    {
      
    var id=req.query.servicetype;
    var usertype= req.session.Usertype;
    var empid= req.session.Empid;
      req.getConnection(function(err,connection){
      
          if(usertype=="BDE")
              {
                  var query=connection.query('SELECT * FROM Opportunity WHERE CreatedBy=? and ServiceType =?',[empid,id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
                 
              }
          else
              {
                var query=connection.query('SELECT * FROM Opportunity WHERE ServiceType=?',[id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
              }
   
          console.log(query);
       
    });   
})

router.get('/GetStageDetails/', function(req,res)
    {
      
    var id=req.query.stage;
    var usertype= req.session.Usertype;
    var empid= req.session.Empid;
      req.getConnection(function(err,connection){
      
          if(usertype=="BDE")
              {
                  var query=connection.query('SELECT * FROM Opportunity WHERE CreatedBy=? and SalesStage =?',[empid,id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
                 
              }
          else
              {
                var query=connection.query('SELECT * FROM Opportunity WHERE SalesStage=?',[id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
              }
   
          console.log(query);
       
    });   
})
/***********************************Sales Analysis*******************/
router.get('/SalesAnalysis',function(req,res,next)
           {
     
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM opportunity',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/SalesAnalysis',{title:"Sales Analysis - Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    }); 


router.get('/GetTrainingDetails/', function(req,res)
    {
      
    var id=req.query.yr;
     var Servtyp=req.query.serv;
 
   
      req.getConnection(function(err,connection){
      
      
           
                  var query=connection.query('SELECT * FROM Opportunity WHERE year(CreatedOn) =? and ServiceType=?',[id,Servtyp],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);
 console.log(query);
                 });
                 
              });

});

   



module.exports = router;