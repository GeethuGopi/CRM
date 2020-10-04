/***************************Add Leads*****************************/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
     var usertype= req.session.Usertype;
    var empid= req.session.Empid;
     req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM Leads WHERE CreatedBy="'+empid+'"',function(err,rows) {
            
        if(err)
           console.log("Error Selecting : %s ",err );     
            res.render('pages/LeadDetails',{title:"Leads - Node.js",data:rows, Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
       
    });   
});

router.get('/LeadAdd', function(req, res, next) {
    console.log("inside get");
  res.render('pages/LeadAdd', { title: 'Express',Username:req.session.UserName,Usertype:req.session.Usertype});                  
});

/********************************Save Leads***************************/

router.post('/LeadAdd',function(req,res,next)
            {
     var input = JSON.parse(JSON.stringify(req.body));
     var dt= new Date();
    dt=format(dt);
        req.getConnection(function (err, connection) {      
        var data = {
            
            LeadSource     : input.ddlType,
            ReferedBy      : input.txtRfr,
            Comments       : input.txtComnt,
            Status         : 'New',
            AccountName    : input.txtAcnt,
            Address        : input.txtAddress,
            Phone          : input.txtPhone,
            Website        :input.txtWeb,
            contractPerson :input.txtCon,
            Designation    :input.ddType,
            WorkPhone      :input.txtWork,
            Mobile         :input.txtMobile,
            Email          :input.txtEmail,
            LeadDesc       :input.txtDes,
            CreatedBy      :req.session.Empid,
            CreatedOn      :dt,
            ModifiedOn     :dt,
            ModifiedBy     :req.session.Empid
            
            
        };
            console.log(data);           
        var query = connection.query("INSERT INTO Leads set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/lead');
              
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


/******************************Edit Leads**********************************/
router.get('/EditLead',function(req,res,next)
           {
      var id = req.query.id;
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM Leads WHERE AccountName = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/EditLead',{title:"Edit Lead - Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    }); 

/***************************************Save Edit User*********************/
router.post('/EditLead',function(req,res,next)
            {
    var id=req.body.txtAcnt;
    console.log(id);
      var dt= new Date();
    dt=format(dt);
req.getConnection(function (err, connection) {

    var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            
         
            LeadSource:input.ddlType,
            AccountName:input.txtAcnt,
            Website : input.txtWeb,
            contractPerson: input.txtCon,
            Designation   : input.ddType,
            Address  :input.txtAddress,
            Email  : input.txtEmail,
            WorkPhone  :input.txtWork,
            ReferedBy :input.txtRfr,
            Mobile    :input.txtMobile,
            Phone :input.txtPhone,
            Comments:input.txtComnt,
            LeadDesc:input.txtLeadDes,
            CreatedBy:input.txtCrtby,
            CreatedOn:format(input.txtCrton),
            ModifiedOn     :dt,
            ModifiedBy     :req.session.Empid,
            Status:input.txtstat
            
        
        };
        //console.log(data);
        connection.query("UPDATE Leads set ? WHERE AccountName = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/Lead');
          
        });
    
    });
});

/*********************************Admin Leads*******************/
router.get('/AdminLeads', function(req, res, next) {
    console.log("inside get");
     req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM Leads',function(err,rows) {
            
        if(err)
           console.log("Error Selecting : %s ",err );     
            res.render('pages/AdminLeads',{title:"Leads - Node.js",data:rows, Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
       
    });   
});


/*************************************Lead Details**************/
router.get('/Details',function(req,res,next)
           {
      var id = req.query.id;
    req.getConnection(function(err,connection)
  {
       
     connection.query('SELECT * FROM Leads WHERE AccountName = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     console.log(rows);
            res.render('pages/Details',{title:"Lead Details- Node.js",data:rows,Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
                 
    });                              
    }); 

/************************************Manager Leads****************/
router.get('/ManagerLeads', function(req, res, next) {
    console.log("inside get");
     req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM Leads',function(err,rows) {
            
        if(err)
           console.log("Error Selecting : %s ",err );     
            res.render('pages/ManagerLeads',{title:"Leads - Node.js",data:rows, Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
       
    });   
});

/************************Search Lead****************/
router.get('/GetLeadAccountDetails/', function(req,res)
    {  
    var id=req.query.accname;
    var usertype= req.session.Usertype;
    var empid= req.session.Empid;
      req.getConnection(function(err,connection){
      
          if(usertype=="BDE")
              {
                  var query=connection.query('SELECT * FROM Leads WHERE CreatedBy="'+empid+'" and AccountName Like  "'+id+'%"',function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
                 
              }
          else
              {
                var query=connection.query('SELECT * FROM Leads WHERE AccountName Like "'+id+'%"',function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
              }
   
          console.log(query);
       
    });   
})

router.get('/GetLeadStatusDetails/', function(req,res)
    {
      
    var id=req.query.status;
    var usertype= req.session.Usertype;
    var empid=req.session.Empid;
      req.getConnection(function(err,connection){
       
           if(usertype=="BDE")
              {
           var query=connection.query('SELECT * FROM Leads WHERE CreatedBy=? and Status =?',[empid,id],function(err,rows)
                    {
            
                    if(err)
                        console.log("Error Selecting : %s ",err );   
                    res.json(rows);

                 });
              }
          else
              {
    var query=connection.query('SELECT * FROM Leads WHERE Status=?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );   
            res.json(rows);
                           
         });
        
                  } console.log(query);
       
    });  
      
})

router.get('/GetLeadSourceDetails/', function(req,res)
    {
      
    var id=req.query.leadSource;
    var usertype= req.session.Usertype;
    var empid=req.session.Empid;
      req.getConnection(function(err,connection){
       
     if(usertype=="BDE")
              {
           var query=connection.query('SELECT * FROM Leads WHERE CreatedBy=? and LeadSource =?',[empid,id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );   
            res.json(rows);
                           
         });
              }
          else
          {
               var query=connection.query('SELECT * FROM Leads WHERE LeadSource=?',[id],function(err,rows)
{
            
            if(err)
                console.log("Error Selecting : %s ",err );   
            res.json(rows);
                           
         });
        
                  } console.log(query);
       
    });  
      
})

/*************************GetBde Analysis***************************/
router.get('/BDEDetails',function(req,res,next)
           {
     
 
            res.render('pages/BDEAnalysis',{title:"BDE Analysis - Node.js",Username:req.session.UserName,Usertype:req.session.Usertype});
                           
        
                 
    });     
/*****************Display chart************************/
 router.get('/highChart/',function(req,res,next)
           {   
               var yr=req.query.year;
                var name=req.query.name;
     console.log(yr);
     console.log(name);
              req.getConnection(function(err,connection)
                {
                     var query=connection.query('select l.Accountname,count(*) as nopp from Leads l join Opportunity o on o.AccountName=l.AccountName where l.Createdby=? and Year(l.CreatedOn)=? group by o.AccountName',[name,yr],function(err, rows)
                        {
                            console.log(query.sql);
                                if(err)
                                console.log("Error Selecting : %s ",err );
                                res.json(rows);
                        });
                });
        });

router.get('/GetBDEDetails/', function(req,res)
    {
      
    var id=req.query.year;
     var Employee=req.query.bde;
  
      req.getConnection(function(err,connection){
      
      
           
                  var query=connection.query('SELECT Leads.Status, Opportunity.ServiceType,Leads.AccountName,Leads.LeadSource,count(*) as oppcount FROM Leads INNER JOIN Opportunity ON Leads.AccountName=Opportunity.AccountName where Leads. Createdby ="'+Employee+'" and year(Leads.CreatedOn)="'+id+'" Group By Opportunity.AccountName',function(err,rows)
                    {
            console.log(query.sql)
                    if(err)
                        console.log("Error Selecting : %s ",err ); 
                      ;
                    res.json(rows);
 console.log(query);
                 });
                 
              });

});
   




module.exports = router;

