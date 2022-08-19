$(function () {
    // 点击切换盒子显示
    $('#link-red').on('click', function () {
        $('.login-box').hide()
        $('.red-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.red-box').hide()
    })


    // 表单格式验证
    var form = layui.form
    // 内置提示框
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        // 校验两次密码是否一致
        repass:function(value) {
           var pwd =  $('#password1').val()
           if(pwd !== value){
            return '两次密码不一致';
           }
        }
    })


    // 监听注册表单提交事件
    $('#form-reg').on('submit',function(e) {
        // 阻止默认跳转行为
        e.preventDefault()
        $.post('/api/reguser',{
            username:$('#form-reg [name=username]').val(),
            password:$('#form-reg [name=password]').val(),
        },function(res) {
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功请登录');
            $('#link-login').click();
        })
    })

    // 监听登录事件
    $('#form-login').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // serialize()是快速获取表达内的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('成功登录');
                // 将登录成功得到的登录认证token保存
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})