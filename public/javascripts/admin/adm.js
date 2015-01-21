/*adm前端部分*/
$(document).ready(function(){
  /*编辑点击*/
	$(".admEdit").click(function(){
        $("#addForm").attr("style","display:none");
        $("#editForm").attr("style","display:block");
		var gid = $(this).attr('val');
		var url = "?op=get&gid="+gid;
		 $.ajax({
                url:"?op=get&gid="+gid,
                type:'get',
                dataType: 'json',
                cache: false,
                timeout: 5000,
                success: function(data){
                	//alert(data.name);
                    //var data = $.parseJSON(data);
                    //alert(data.name);
                    $('#editForm #xh').attr('value',data.id);
                    $('#editForm #loginID').attr('value',data.loginID);
                    $('#editForm #name').attr('value',data.name);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert('error ' + textStatus + " " + errorThrown);  
                }
            });
	});

    /*删除点击*/
    $(".admDel").click(function(){
        if(!confirm('确认删除？'))
            return;
        else
            var gid = $(this).attr('val');
            var url = "?op=del&gid="+gid;
            $.get(url,function(data){
                if(data.isDel) location.href="adm";
            });
    })
});
