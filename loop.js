let increment = 1;
let count = 0;

/*
개인코드에서 trigger를 호출 하는것보다는 
엔진에서 trigger를 호출하는게 가장 이상적이다. 그러면 나는 내코드파일에서
on만등록해주면 어떠한경우에 내가등록한 함수가 알아서 실행될것이다.
*/
const loop = function() {
    if(count%10 === 0 && count !== 0) 
        Events.trigger('plus', increment++);

    count++;
}

const start = function(callback,interval) {
    window.setInterval(() => {
        callback();
        loop();
    },interval);
}