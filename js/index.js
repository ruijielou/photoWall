//改变根节点字体大小
function changeRem(){
    var currClientWidth, fontValue,originWidth;
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
        fontValue = ((100 * currClientWidth) /originWidth).toFixed(2);
        document.documentElement.style.fontSize = fontValue + 'px';
    }
}(changeRem());

function loadingImg() {
    $('img[data-name="photo"]')
}