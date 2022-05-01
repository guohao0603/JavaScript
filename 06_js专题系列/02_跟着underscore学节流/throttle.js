/*
节流

节流的原理很简单：如果你持续触发事件，每隔一段时间，只执行一次事件。

根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
我们用leading代替首次是否执行，trailing代表结束后是否再执行一次。

关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
*/
/*
使用时间戳

让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，
然后减去之前的的时间戳(最开始值设为)，如果大于设置的时间周期，就执行函数，
然后更新时间戳为当前的时间戳，如果小于，就不执行。

看了这个表述，是不是感觉已经可以写出代码了.....让我们来写第一版代码：
*/
var count = 1;
var container = document.getElementById('container');
function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
}
// 第一版：
// function throttle(func, wait){
//     var context, args;
//     var pervious = 0;
//     return function(){
//         var now = +new Date(); // + 转事件戳的方法
//         context = this;
//         args = arguments;
//         if (now - pervious > wait) {
//             func.apply(context, args)
//             pervious = now
//         }
//     }

// }

// container.onmousemove = throttle(getUserAction, 1000);

/*
使用定时器

接下来，我们讲讲第二种实现方式，使用定时器。

当事件触发的时候，我们设置了一个定时器，再触发事件的时候，如果定时器存在，就
不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
*/
// 第二版
function throttle(func, wait) {
    var timeout;
    var pervious = 0;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}
container.onmousemove = throttle(getUserAction, 3000);
/*
我们可以看到：当鼠标移入的时候，事件不会立刻执行，晃了3s后终于执行了一次，
此后每3s执行一次，当数字显示为3的时候立刻移出鼠标
*/