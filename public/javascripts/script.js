$(document).ready(function()
     {
    
    /**********Admin Leads Search****************************/
    $("#frmAdminLead").ready(function()
     {
      $("#LeadSource").change(function()
                     {
                    $("#tbladminLeads tbody").empty();
            $.get('/lead/GetLeadSourceDetails/',{leadSource: $("#LeadSource").val()},function(data)
                 {
                var tbl="";
               
                if(data.length>=1)
                    {
                       
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+
                        '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tbladminLeads tbody").append(tbl);
                    }
                else{
                  
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbladminLeads tbody").append(tbl);
                }
                  })
                    });
        
         $("#accountName").css("display","none");   
         $("#ddlStatus").css("display","none"); 
        $("#ddlType").change(function()
            {
              if($(this).val() == 'AccountName')
                {
                    
                $("#accountName").css("display","block");   
                $("#ddlStatus").css("display","none");   
                 $("#ddlLeadsource").css("display","none");
                $("#AccountName").change(function()
                     {
                    $("#tbladminLeads tbody").empty();
            $.get('/lead/GetLeadAccountDetails/',{accname:$("#AccountName").val()},function(data)
                 {
                var tbl="";
                 if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+ '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tbladminLeads tbody").append(tbl);
                    }
                 else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbladminLeads tbody").append(tbl);
                }
                  })
                    });
                    
                }
            else if($(this).val() == 'Status')
                {
                    
                    $("#accountName").css("display","none");   
                    $("#ddlStatus").css("display","block");   
                     $("#ddlLeadsource").css("display","none");  
                    //dropdown chnage
                    $("#Status").change(function()
                     {
                    $("#tbladminLeads tbody").empty();
            $.get('/lead/GetLeadStatusDetails/',{status: $("#Status").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+
                        '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tbladminLeads tbody").append(tbl);
                    }
                 else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbladminLeads tbody").append(tbl);
                }
                
                  })
                    });
                    
                    
                    
                }
            else
                {
                    if($(this).val() == 'LeadSource')
                       { 
                    $("#accountName").css("display","none");   
                    $("#ddlStatus").css("display","none");   
                     $("#ddlLeadsource").css("display","block");
                
                }
                }
            
        })
        
      });
    
    /***********************************Search query Details********/
    
    /*************************Manager lead Search************/
     $("#frmManagerLead").ready(function()
     {
         $("#LeadSource").change(function()
                     {
                    $("#tblmanagerLeads tbody").empty();
            $.get('/lead/GetLeadSourceDetails/',{leadSource: $("#LeadSource").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
                        
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+ '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tblmanagerLeads tbody").append(tbl);
                    }
                else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tblmanagerLeads tbody").append(tbl);
                }
                  })
                    });
      
         $("#accountName").css("display","none");   
         $("#ddlStatus").css("display","none"); 
        $("#ddlType").change(function()
            {
              if($(this).val() == 'AccountName')
                {
                    
                    $("#accountName").css("display","block");   
                    $("#ddlStatus").css("display","none");   
                     $("#ddlLeadsource").css("display","none");  
                    $("#AccountName").change(function()
                     {
                    $("#tblmanagerLeads tbody").empty();
            $.get('/lead/GetLeadAccountDetails/',{accname:$("#AccountName").val()},function(data)
                 {
                var tbl="";
               
                 if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+ '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tblmanagerLeads tbody").append(tbl);
                    }
                 else{
                  
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tblmanagerLeads tbody").append(tbl);
                }
                  })
                    });
                    
                }
                
            else if($(this).val() == 'Status')
                {
                    
                    $("#accountName").css("display","none");   
                    $("#ddlStatus").css("display","block");   
                     $("#ddlLeadsource").css("display","none");  
                    $("#Status").change(function()
                     {
                    $("#tblmanagerLeads tbody").empty();
            $.get('/lead/GetLeadStatusDetails/',{status: $("#Status").val()},function(data)
                 {
                var tbl="";
                 
                 if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+
                         '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tblmanagerLeads tbody").append(tbl);
                    }
                 else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tblmanagerLeads tbody").append(tbl);
                }
                  })
                    });
                    
                    
                    
                }
                
            else
                {
                    $("#accountName").css("display","none");   
                    $("#ddlStatus").css("display","none");   
                     $("#ddlLeadsource").css("display","block");  
           
                }
                
            
        })
        
      });
    /***************************BDE lead Search***************/
     $("#frmLeadDetails").ready(function()
     {
         $("#LeadSource").change(function()
                     {
                    $("#tblBdeleads tbody").empty();
            $.get('/lead/GetLeadSourceDetails/',{leadSource: $("#LeadSource").val()},function(data)
                 {
                var tbl="";
                 if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+ '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tblBdeleads tbody").append(tbl);
                    }
                else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tblBdeleads tbody").append(tbl);
                }
                  })
                    });
      
         $("#accountName").css("display","none");   
         $("#ddlStatus").css("display","none"); 
        $("#ddlType").change(function()
            {
              if($(this).val() == 'AccountName')
                {
                    
                    $("#accountName").css("display","block");   
                    $("#ddlStatus").css("display","none");   
                     $("#ddlLeadsource").css("display","none");  
                     $("#AccountName").change(function()
                     {
                    $("#tblBdeleads tbody").empty();
            $.get('/lead/GetLeadAccountDetails/',{accname:$("#AccountName").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+ '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tblBdeleads tbody").append(tbl);
                    }
                 else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tblBdeleads tbody").append(tbl);
                }
                  })
                    });
                    
                }
                 
            else if($(this).val() == 'Status')
                {
                    
                    $("#accountName").css("display","none");   
                    $("#ddlStatus").css("display","block");   
                     $("#ddlLeadsource").css("display","none");  
                     $("#Status").change(function()
                     {
                    $("#tblBdeleads tbody").empty();
            $.get('/lead/GetLeadStatusDetails/',{status: $("#Status").val()},function(data)
                 {
                var tbl="";               
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.contractPerson+'</td>'+
                        '<td>'+value.Email+'</td>'+
                        '<td>'+value.Status+'</td>'+
                        '<td>'+value.Mobile+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                        '<td>'+format(value.CreatedOn)+'</td>'+ '<td><a class="a-inside details" href="/lead/Details/?id='+value.AccountName+'">Details</a></td></tr>';
                 })
                 $("#tblBdeleads tbody").append(tbl);
                    }
                 else{
                 
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tblBdeleads tbody").append(tbl);
                }
                  })
                    });
                    
                    
                    
                }
                
                
            else
                {
                    $("#accountName").css("display","none");   
                    $("#ddlStatus").css("display","none");   
                     $("#ddlLeadsource").css("display","block");  
                   /*  $("#LeadSource").change(function()
                     {
                    $("#tblBdeleads tbody").empty();
           $.get('/lead/GetLeadSourceDetails/',{leadSource: $("#LeadSource").val()},function(data)
                 {
                var tbl="";
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td><td>'+value.contractPerson+'</td><td>'+value.Email+'</td><td>'+value.Status+'</td><td>'+value.Mobile+'</td><td>'+value.LeadSource+'</td><td>'+format(value.CreatedOn)+'</td></tr>';
                 })
                 $("#tblBdeleads tbody").append(tbl);
                  })
                    });*/
                }
        })
        
      });
    
    
    

/***********************Admin,BDE,Manager Opportunity Search***************/
     /************Opportunity Search****************************/
$("#frmOpportunity").ready(function()
                                {
    $("#AccountType").change(function()
                     {
                         $("#tbl tbody").empty();
            $.get('/Opportunity/GetAccountTypeDetails/',{acctype:$("#AccountType").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                         '<td>'+value.SalesStage+'</td>'+
                         '<td>'+format(value.EstimatedClosDate)+'</td>'+
                         '<td>'+value.ServiceType+'</td>'+
                         '<td>'+value.AccountType+'</td>'+
                         '<td>'+format(value.EstimatedDuration)+'</td>'+
                         '<td>'+value.Practice+'</td>'+
                         '<td>'+value.CreatedBy+'</td>'+
                        '<td><a href="/Opportunity/OpportunityDetails/?id='+value.OpportunityID+'">Details</a></tr>'; 
                 })
              
                 $("#tbl tbody").append(tbl);
                    }
                else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbl tbody").append(tbl);
                }
                  })
                    });
  $("#date").css("display","none");
    $("#ddlServiceType").css("display","none");
    $("#ddlStage").css("display","none");
     $("#ddlType").change(function()
            {
         if($(this).val() == 'AccountType')
                {
                $("#AccountType").css("display","block");
                $("#date").css("display","none");
                $("#ddlServiceType").css("display","none");
                $("#ddlStage").css("display","none");
                   
                }
      else if($(this).val() == 'Date')
    {
        $("#date").css("display","block");
    $("#ddlServiceType").css("display","none");
    $("#ddlStage").css("display","none");
        $("#AccountType").css("display","none");
         $("#date").change(function()
                     {
                         $("#tbl tbody").empty();
            $.get('/Opportunity/GetDateDetails/',{frmdate:$("#txtFrom").val(),todate:$("#txtTo").val()},function(data)
                 {
                var tbl="";
                 if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.SalesStage+'</td>'+
                     '<td>'+format(value.EstimatedClosDate)+'</td>'+
                        '<td>'+value.ServiceType+'</td>'+
                        '<td>'+value.AccountType+'</td>'+
                        '<td>'+value.EstimatedDuration+'</td>'+
                        '<td>'+value.Practice+'</td>'+
                        '<td>'+value.CreatedBy+'</td>'+
                       '<td><a href="/Opportunity/OpportunityDetails/?id='+value.OpportunityID+'">Details</a></tr>';
                 })
                 $("#tbl tbody").append(tbl);
                    }
                else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbl tbody").append(tbl);
                }
                  })
                    });
    }
                    else if($(this).val() == 'ServiceType')
                        {
                            $("#ddlServiceType").css("display","block");
                            $("#date").css("display","none");
                             $("#ddlStage").css("display","none");
                            $("#AccountType").css("display","none");
                               $("#ServiceType").change(function()
                                   {
                        $("#tbl tbody").empty();
            $.get('/Opportunity/GetServiceTypeDetails/',{servicetype:$("#ServiceType").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.SalesStage+'</td>'+
                        '<td>'+format(value.EstimatedClosDate)+'</td>'+
                        '<td>'+value.ServiceType+'</td>'+
                        '<td>'+value.AccountType+'</td>'+
                           '<td>'+value.EstimatedDuration+'</td>'+
                        '<td>'+value.Practice+'</td>'+
                        '<td>'+value.CreatedBy+'</td>'+
                       '<td><a href="/Opportunity/OpportunityDetails/?id='+value.OpportunityID+'">Details</a></tr>';
                 })
                 $("#tbl tbody").append(tbl);
                    }
                else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbl tbody").append(tbl);
                }
                
                  })
                    });
                               
                               
                               
                               }
                    
                    else
                        {
                          $("#ddlServiceType").css("display","none");
                            $("#date").css("display","none");
                             $("#ddlStage").css("display","block");
                            $("#AccountType").css("display","none");  
                            $("#Stage").change(function()
                                   {
                        $("#tbl tbody").empty();
            $.get('/Opportunity/GetStageDetails/',{stage:$("#Stage").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                      '<td>'+value.SalesStage+'</td>'+
                        '<td>'+format(value.EstimatedClosDate)+'</td>'+
                        '<td>'+value.ServiceType+'</td>'+
                         '<td>'+value.AccountType+'</td>'+
                        '<td>'+value.EstimatedDuration+'</td>'+
                        '<td>'+value.Practice+'</td>'+
                        '<td>'+value.CreatedBy+'</td>';
                     if(value.SalesStage=="closedWon")
                         {
                        
                             tbl+='<td><a  href="/Opportunity/OpportunityDetails/?id='+value.OpportunityID+'">Details</a></td><td><a href="/Workorder/CreateWorkorder/?id='+value.OpportunityID+'">WorkOrder</a></td>';
                         }
                     else
                         {
                             tbl+='<td><a  href="/Opportunity/OpportunityDetails/?id=<%=data[i].OpportunityID%>">Details</a></td>&nbsp;';
                         }
                     tbl+='</tr>';
                 })
                 $("#tbl tbody").append(tbl);
                    }
                 else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbl tbody").append(tbl);
                }
                  })
                    });
                        }               
   
         });
});
    
    /**************************WorkOrder*********************/
    $("#frmWorkorder").ready(function()
                                {
    $("#ddlType").change(function()
                     {
                         $("#tbl tbody").empty();
            $.get('/WorkOrder/GetWorkorderDetails/',{status:$("#ddlType").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.OpportunityID+'</td>'+
                         '<td>'+format(value.WODate)+'</td>'+
                         '<td>'+value.WOTerms+'</td>'+
                         '<td>'+value.WOAmount+'</td>'+
                         '<td>'+value.Remarks+'</td>'+
                         '<td>'+value.Status+'</td>'+'</tr>';
                        
                 })
              
                 $("#tbl tbody").append(tbl);
                    }
                else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbl tbody").append(tbl);
                }
                  })
                    });
  
});
  
    /****************************HighChart****************/
    $("#btnLeadsearch").click(function()
        {
                var bde=$("#Bde").val();
                var yr=$("#yearr").val();
                 $("#chart").empty();
                $.get('/lead/highChart/',{name:bde,year:yr},function(data)
                {
                    
                    highChart(data);
                });
        });
    
 /*************************Sales Analysis********************/   
   $("#frmSalesOrder").ready(function()
                                
                             {
       $("#ServiceType").change(function()
       {
    $("#year").val("select");       
       });
       
    $("#year").change(function()
                     {
       
                         $("#tbl tbody").empty();
            $.get('/Opportunity/GetTrainingDetails/',{serv:$("#ServiceType").val(),yr:$("#year").val()},function(data)
                 {
                var tbl="";
                var total=0;
                if(data.length>=1)
                    {
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.Practice+'</td>'+
                         '<td>'+value.SalesStage+'</td>'+
                         '<td>'+format(value.EstimatedClosDate)+'</td>'+
                        '<td>'+value.EstimatedValue+'</td>'+'</tr>'; 
                     total+=value.EstimatedValue;
                 })
              tbl+='<tr><td colspan="4" align="right"><b>Total Estimated value</b></td><td colspan="2"><font color="red"><b>'+total+'</b></font></td></tr>'
                 $("#tbl tbody").append(tbl);
                    }
                 else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbl tbody").append(tbl);
                }
                    
                  })
                    });
   });
  
     /***********************BDE Analysis*************************/
     $("#frmBDE").ready(function()
       
                      
                             {  
        
       $("#Bde").change(function()
       {
    $("#yearr").val("select");       
       });
       
    $("#yearr").change(function()
                     {
       
                         $("#tbl tbody").empty();
            $.get('/Lead/GetBDEDetails/',{bde:$("#Bde").val(),year:$("#yearr").val()},function(data)
                 {
                var tbl="";
                if(data.length>=1)
                    {
               
                 $.each(data,function(key,value)
                      {
                    
                    tbl+='<tr><td>'+value.AccountName+'</td>'+
                        '<td>'+value.LeadSource+'</td>'+
                         '<td>'+value.Status+'</td>'+
                         '<td>'+value.ServiceType+'</td>'+
                     '<td>'+value.oppcount+'</td>'+'</tr>';
                 })
             
                 $("#tbl tbody").append(tbl);
                    }
                else{
                  tbl+='<tr><td colspan="5"><b><font color="red">No Records Found!!</font></b></td></tr>'; 
                     $("#tbl tbody").append(tbl);
                }
               
                  })
                    });
   });
  
    
    /*******************************User Status*******************/
    
    $("#frmUser").ready(function()
                                {
    $("#ddlTypeUser").change(function()
                     {
                         $("#tblUser tbody").empty();
            $.get('/GetUserstatus/',{Status:$("#ddlTypeUser").val()},function(data)
                 {
              
                var tbl="";
                
                 $.each(data,function(key,value)
                      {
                    tbl+='<tr><td>'+value.EmpName+'</td>'+
                         '<td>'+value.UserType+'</td>'+
                         '<td>'+value.Designation+'</td>'+
                         '<td>'+value.Email+'</td>'+
                         '<td>'+value.Phone+'</td>'+
                         '<td>'+format(value.DOJ)+'</td>'+
                         '<td>'+value.Status+'</td>'+'</tr>';
                        
                 })
              
                 $("#tblUser tbody").append(tbl);
                    })
                  })
                 
                    });
  

  
    
    /*************************Document ready***************/
});
    /***********************Date******************************/
        function format(date) 
        {
                date = new Date(date);                
                var day = ('0' + date.getDate()).slice(-2);
                var month = ('0' + (date.getMonth() + 1)).slice(-2);
                var year = date.getFullYear();
                return year + '-' + month + '-' + day;
        }

function highChart(data){
        var data=data;
        var jsonString = JSON.stringify(data);
  
         var chartSeriesData = [];
         $.each(data, function(k,v) {

         var s_name = v.Accountname;
    var s_data = v.nopp;
    var series = [
            s_name,
            parseInt(s_data)
        ];
           
    chartSeriesData.push(series);
    });
         
         var options = {
             chart: {
                 plotBackgroundColor: null,
                 plotBorderWidth: null,
                 plotShadow: false
             },
             title: {
                 text: 'Sales Analysis '
             },           
             series: [{
                 type: 'pie',
                 name: 'Opportunity',
                 data:chartSeriesData //load array created from json
             }]
         }


  //options.series[0].setData(datavaluejson);
  var chart= $('#chart').highcharts(options);
         }

