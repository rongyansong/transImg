/**
 * Created by YangZi on 2016/8/13.
 */
// ��ȡ��ǰ��ʽ
function getStyle(obj, name){
    //�����ȡ��ǰ��ʽ�ڲ�ͬ������ϵļ�������
    if(obj.currentStyle){
        //IE7���µͰ汾�����
        return obj.currentStyle[name]
    }else{
        //����ȸ�ȸ߰汾�����
        return getComputedStyle(obj, false)[name];
    }
}
var timer = null;//������ʱ��
function startMove(obj, attr, target, fnEnd) {
    clearInterval(obj.timer);//����ɶ�ʱ��
    obj.timer = setInterval(function () {
        var curStyle = 0;
        //��������͸������ʽ
        if (attr == 'opacity') {
            curStyle = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            //��͸�������⣬������ʽ
            curStyle = parseInt(getStyle(obj, attr));
        }
        //��ȡ�����ٶȣ�������ȡ�������ⲻ�ܾ�׼����ָ��λ��
        var speed = (target - curStyle) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (curStyle == target) {
            clearInterval(timer);//����λ��ֹͣ��ʱ��

            if(fnEnd)fnEnd();
        } else {
            if (attr == 'opacity') {//�ı�͸���ȵ���ʽ
                obj.style.filter = 'alpha(opacity:' + (curStyle + speed) + ')';
                obj.style.opacity = (curStyle + speed) / 100;
            } else {//�ı��͸���������������ʽ
                obj.style[attr] = curStyle + speed + 'px';
            }
        }
    }, 30);
}