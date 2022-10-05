var getID=async function()
{
    let token=$("#token").val();
    if(token.length==0)
    {
        alert("Bạn phải nhập Token");
    }
    else
    {
        let cookie=$("#cookie").val();
        var form = new FormData();
        form.append("token", token);
        form.append("cookie",cookie);
        let url=window.location.origin+"/api/getAdAccount";
        var settings = {
          "url": url,
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };
        
        $.ajax(settings).done(function (response) {
          let data=JSON.parse(response).data;
          data=JSON.parse(data);
          if(data.error)
          {
            alert("Không lấy được ID Tài khoản quảng cáo!");
          }
          else
          {
            let str=[];

           if(data.data.length>0)
           {
                for(var i=0;i<data.data.length;i++)
                {
                    str.push(data.data[i].id);
                }
           }
           $("#idcount").text(str.length);
           $("#account").val(str.join("\r\n"));
          

          }
        });
    }
        
}


function asyncAjax(url,form){


    return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form,
                beforeSend: function() {            
                },
                success: function(data) {
                    resolve(data) // Resolve promise and when success
                },
                error: function(err) {
                    reject(err) // Reject the promise and go to catch()
                }
            });
    });
}
var share_ads=async function(token,cookie,account_id,uid,role){

     let url=window.location.origin+"/api/shareAccount";   
     var form = new FormData();
        form.append("token", token);
        form.append("cookie",cookie);
        form.append("account_id",account_id);
        form.append("uid",uid);
        form.append("role",role);
    let kq=await  asyncAjax(url,form).then(x=>x).catch(x=>x); 
    return kq;
        
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var batdau= async function()
{
   let uid=$("#uid").val();
   let token=$("#token").val();
   let cookie=$("#cookie").val();

   if(uid.length==0)
   {
    alert("Chưa nhập UID share quảng cáo!")
   }
   else if(token.length==0)
   {
     alert("Chưa nhập Token!")
   }
   else
   {
     let lstAdAccount=$("#account").val().split("\n");
     
     if(lstAdAccount.length>0)
     {
        let thoigian=parseInt($("#second").val(), 10);
        

         let code_role=$("#role option:selected").val();
         let role="461336843905730"
         if(code_role=="1001") role="281423141961500";
         else if(code_role=="1002") role="461336843905730"
         else if(code_role=="1003") role="498940650138739"
        for(var i=0;i<lstAdAccount.length;i++)
        {
         
           
            try{
                console.log(lstAdAccount[i])
                let result = await share_ads(token,cookie,lstAdAccount[i],uid,role);
                result=JSON.parse(result)
                result=JSON.parse(result.data)
                if(result.success)
                {
                    let tongso=parseInt($("#num_live").text(),0);
                    tongso=tongso+1;
                    $("#num_live").text(""+tongso)
                    $("#result").append('<p class="text-info"> Share thành công tài khoản '+lstAdAccount[i]+'</p>');
                   
                }
                else
                {
                    let tongso=parseInt($("#num_die").text(),0);
                    tongso=tongso+1;
                    $("#num_die").text(""+tongso)
                    $("#resultfail").append('<p class="text-danger"> Không share được tk '+lstAdAccount[i]+' <b>Error</b> -'+JSON.stringify(result)+'</p>');
                }
                
            } catch(e){
                console.log(e);
            }
            
            await timeout(thoigian*1000)
            if(i==lstAdAccount.length-1)
            alert("Hoàn tất công việc!")
        }

        
        
     }
   }
}

var clearInput=function()
{
    if(confirm("Xóa các trường dữ liệu đã nhập?")){
       $("#token").val("")
       $("#cookie").val("")
       $("#uid").val("")
       $("#account").val("")
       $("#resultfail").html("")
       $("#result").html("")
       $("#num_live").text("0")
       $("#num_die").text("0")
    }
    else{
        return false;
    }
}