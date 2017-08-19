/**
 * Created by lenovo on 2017/8/16.
 */
$(function(){
    //渲染菜单标题
    getCategory();
    //菜单中的列表渲染
    CategoryList();
})

//渲染菜单标题
function getCategory(){
    $.ajax({
        url:nativeurl+'api/getcategorytitle',
        success:function(result){
            //console.log(result);
            var html=template('categoryTitle',result);
            //console.log(html);
            $('#categoryuu').html(html);
        }
    })
}

//菜单中的列表渲染
function CategoryList(){
  $('#categoryuu').on('click','.categoryTitle',function(){
      //console.log(this);
      var tid=parseInt($(this).attr('titleId'));
      $.ajax({
          url:nativeurl+'api/getcategory',
          data:{titleid:tid},
          success:function(result){
              //console.log(result);
              var html=template('categoryListTp',result);
              //console.log(html);
              //console.log($('.List' + tid));
              $('.List'+tid).html(html);
          },
          complete:function(){
              $('.categoryList').hide();
              $('.List'+ tid).show();
          }
      });
  })
}

