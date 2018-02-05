//改变根节点字体大小
function changeRem() {
    var currClientWidth, fontValue, originWidth;
    //originWidth用来设置设计稿原型的屏幕宽度
    originWidth = 1366;
    __resize();

    //注册 resize事件
    window.addEventListener('resize', __resize, false);

    function __resize() {
        currClientWidth = document.documentElement.clientWidth;
        //这里是设置屏幕的最大和最小值时候给一个默认值
        /*if (currClientWidth >= 640) currClientWidth = 640;
         if (currClientWidth <= 320) currClientWidth = 320;*/
        //
        fontValue = ((100 * currClientWidth) / originWidth).toFixed(2);
        document.documentElement.style.fontSize = fontValue + 'px';
    }
}(changeRem());
loadAllImg();

var loadAjaxStatus = false;

//请求所有已有图片
function loadAllImg() {
    $.ajax({
        url: './js/json.json',
        type: 'get',
        success: function(data) {
            if (data) {
                var data = JSON.parse(data);
                if (data.status == '0' && data.data != null) {

                    var dataList = data.data;
                    var dataList = [
                        { employeeImageURL: './img/10.jpg' },
                        { employeeImageURL: './img/11.jpg' },
                        { employeeImageURL: './img/13.png' },
                        { employeeImageURL: './img/14.jpg' },
                        { employeeImageURL: './img/12.jpg' }
                    ]
                    for (var i = 0; i < dataList.length; i++) {
                        if ($('img[data-name="photo"]').eq(i).attr('data-src') == undefined) {
                            $('img[data-name="photo"]').eq(i).attr('data-src', dataList[i].employeeImageURL);
                            $('img[data-name="photo"]').eq(i).attr('src', dataList[i].employeeImageURL);
                        }
                    }
                    loadAjaxStatus = true;
                    if (loadAjaxStatus) {
                        loadingSocketImg();
                    }
                }
            }
        }
    })
}

//websocket请求方法
function loadingSocketImg() {

    var websocket = new WebSocket('ws://localhost:8090/');

    websocket.onopen = function() {
        console.log('open')
        websocket.send('open');
    }
    websocket.onclose = function() {
        console.log('close');
    }
    websocket.onmessage = function(e) {
        console.log(e);
        var photos = document.querySelectorAll('img[data-name="photo"]');
        for (var key = 0; key < photos.length; key++) {
            var element = photos[key];
            var src = element.getAttribute('data-src');
            if (src == undefined) {

                if (e.data == "closed") {
                    websocket.onclose = function() {
                        console.log('close');
                    }
                }

                element.setAttribute('data-src', e.data);
                element.setAttribute("src", e.data);

                break
            }
        }
    }
}