/**
 * Created by lenovo on 2017/8/18.
 */
$(function(){
    var arr=getRequest();
    var totalSize = 10000;
    console.log(getRequest());
    var productTitle=arr['category'];
    //console.log(productTitle);
    $('#productTitle').html(productTitle);
    var categoryid=arr['categoryid'];
    console.log(categoryid);
    var pageid=1;
    productList(categoryid,parseInt(pageid),totalSize);

})
//获取地址栏里（URL）传递的参数
function getRequest() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


//渲染商品列表
function productList(categoryid,pageid,totalSize){
    $.ajax({
        url:nativeurl+'api/getproductlist',
        data:{
            'categoryid':categoryid,
            'pageid':parseInt(pageid)
        },
        success:function(data){
            //console.log(data.result);
            var productList=template('productTp',{data:data.result});
           $('#productContent').html(productList);

            totalSize=Math.ceil(data.totalCount/data.pagesize);
            var str='';
            for(var i=1;i<=totalSize;i++){
                str+='<option value='+i+'>'+i+'</option>';
                $('#pageSelect').html(str);

                $('#pageSelect option').each(function(i,item){
                    if((i+1)===pageid){
                        $(item).attr('selected','selected');
                    }
                })
            }
        },
        complete:function(){
            $('.prev').unbind('click').click(function(){
                if(parseInt(pageid)===1){ return false;}
                pageid--;
                console.log(parseInt(pageid));
                //console.log(categoryid);
                productList(categoryid,parseInt(pageid));
            });
            $('.next').unbind('click').click(function(){
                if(parseInt(pageid)===totalSize){
                    pageid=totalSize;  return false;}
                pageid++;
                //console.log(parseInt(pageid));
                productList(categoryid,parseInt(pageid));
            })
        }
    })
}