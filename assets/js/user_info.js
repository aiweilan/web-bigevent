$(function () {
    // 昵称格式
    var layer = layui.layer
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6字符之间'
            }
        }
    })

    initUserInfo();
    // 表单获取赋值
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置事件
    $('#btnReset').on('click',function(e) {
        e.preventDefault()
        initUserInfo();
    })
    // 发起ajax数据请求修改数据
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data: $(this).serialize(),
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面的方法重新渲染头像和信息
            window.parent.getUserInfo()
            }
        })
    })
})

