/**
 * Created by C on 2017/8/15.
 */
$(function () {
    //首页菜单动态渲染
    getIndexMenu();
    //折扣渲染
    getDissale();
    //点击更多，隐藏
    getMore();
    //回到顶部
    backTop()
})
//首页菜单动态渲染
function getIndexMenu(){
    $.ajax({
        url: nativeurl+'api/getindexmenu',
        success: function (result) {
            //准备模板
            //绑定数据和模板
            var indexMenuHtml = template('indexMenuTpl',result);
            //html
            $('#menu .row').html(indexMenuHtml);
        }
    })
}
//首页折扣
function getDissale(){
    $.ajax({
        url:nativeurl+'api/getmoneyctrl',
        success:function(result){
            //console.log(result);
            var html=template('indexDissale',result);
            //console.log(html);
            $("#dissale .disList").html(html);
        }
    })
}

//点击更多 隐藏
function getMore(){
    $('.row').on('click','.item:nth-child(8)',function(){
        $('.row .item:nth-last-child(-n+4)').toggle();
    })
}
//回到顶部
function backTop(){
    $('.width40').on('click','a img',function(){
        animate({scrollTop:0},200);
    })
}
