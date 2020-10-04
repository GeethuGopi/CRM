var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside get");
      
     req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM Invoice',function(err,rows) {
            
        if(err)
           console.log("Error Selecting : %s ",err );     
            res.render('pages/InvoiceDetails',{title:"Invoice - Node.js",data:rows, Username:req.session.UserName,Usertype:req.session.Usertype});
                           
         });
       
    });   
});

module.exports = router;

/*************************Create Invoice*******************/
router.get('/InvoiceCreate', function(req, res, next) {
   var id=req.query.id;
    var dt= new Date();
    dt=format(dt);
  res.render('pages/InvoiceCreate', { title: 'Express',dat:dt,WOID:id,Username:req.session.UserName,Usertype:req.session.Usertype});                  
});

/*******************************Invoice Page*****************/
router.post('/InvoiceCreate',function(req,res,next)
            {
     var input = JSON.parse(JSON.stringify(req.body));
     var dt= new Date();
    dt=format(dt);
        req.getConnection(function (err, connection) {      
        var data = {
            
           
             WOID      : input.txtWoid,
             InvoiceDt    : dt,
            InvoiceAmt      :input.txtInvA
           
           
        };
            console.log(data); 
            
            /*****for incrementing****/ 
            var query = connection.query("Select Max(InvoiceID) as invoiceid from Invoice",function(err, rows)
        {
                
                if(rows[0].invoiceid!=null)
                    {
                       var id=rows[0].invoiceid;                    
                    id=id.substr(4,id.length);
                    id=parseInt(id)+1;
                    data.InvoiceID="INV/"+id;          
                    }
                else
                    {
                         data.InvoiceID="INV/100";   
                    }
       var query = connection.query("INSERT INTO Invoice set ? ",data, function(err, rows)
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
