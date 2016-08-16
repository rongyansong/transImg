/**
 * Created by YangZi on 2016/8/13.
 */
// 获取当前样式
function getStyle(obj, name){
    //解决获取当前样式在不同浏览器上的兼容问题
    if(obj.currentStyle){
        //IE7以下低版本浏览器
        return obj.currentStyle[name]
    }else{
        //火狐谷歌等高版本浏览器
        return getComputedStyle(obj, false)[name];
    }
}
var timer = null;//创建定时器
function startMove(obj, attr, target, fnEnd) {
    clearInterval(obj.timer);//清除旧定时器
    obj.timer = setInterval(function () {
        var curStyle = 0;
        //单独处理透明度样式
        if (attr == 'opacity') {
            curStyle = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            //除透明度以外，其他样式
            curStyle = parseInt(getStyle(obj, attr));
        }
        //获取当期速度，并将其取整，避免不能精准到达指定位置
        var speed = (target - curStyle) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (curStyle == target) {
            clearInterval(timer);//到达位置停止定时器

            if(fnEnd)fnEnd();
        } else {
            if (attr == 'opacity') {//改变透明度的样式
                obj.style.filter = 'alpha(opacity:' + (curStyle + speed) + ')';
                obj.style.opacity = (curStyle + speed) / 100;
            } else {//改变除透明度以外的其他样式
                obj.style[attr] = curStyle + speed + 'px';
            }
        }
    }, 30);
}