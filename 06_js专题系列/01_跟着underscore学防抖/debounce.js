/*
var count = 1;
var container = document.getElementById('container');
function getUserAction() {
    container.innerHTML = count++;
}
container.onmousemove = getUserAction;
*/
/*
从左边滑到右边就触发了165次getUserAction函数！

因为这个例子很简单，所以浏览器完全能反应过来，可是如果是复杂的回调函数或者
是ajax请求呢？假设1s触发了60次，每个回调就必须在1000/60 = 16.67ms内完成
否则就会有卡顿出现。

为了解决这个问题，一般有两种解决方案：
1.debounce 防抖
2.throttle 防抖

今天重点讲讲防抖的实现。
防抖的原理就是：你尽管触发事件，但是我一定在事件触发n秒后才执行，如果你在一个
事件触发的n秒内又触发了这个事件，那我就以新的事件的时间为准，n秒后才执行，总之
就是要等你触发完事件n秒内不再触发事件，我才执行，真实任性啊！

*/
// 第一版
var count = 1;
var container = document.getElementById('container');
function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
}
// function debounce(func, wait){
//     var timeout;
//     return function (){
//         clearTimeout(timeout);
//         timeout = setTimeout(func,wait);
//     }
// }
container.onmousemove = debounce(getUserAction,1000);
/*
现在随你怎么移动，反正你移动完1000ms内不再触发，我才执行事件。
顿时就从165次降低成了1次
*/
/*
this
如果我们在getUserAction 函数中 console.log(this),在不适用debounce函数的
时候，this的值为：
<div id="container"></div>
但是如果使用我们的debounce函数，this就会指向Window对象
所以我们需要将this指向正确的对象

我们修改下代码：
*/
// 第二版
// function debounce(func, wait) {
//     var timeout;
//     return function(){
//         var context = this;
//         clearTimeout(timeout)
//         timeout = setTimeout(function(){
//             func.apply(context)
//         },wait)
//     }
// }
// 现在this已经可以正确指向了。让我们看下问题：
/*
event 对象
JavaScript 在事件处理函数中会提供事件对象event，我们修改下getUserAction函数
function getUserAction(e){
    console.log(e);
    container.innerHTML = count++;
}
如果我们不使用debouce函数，这里会打印MouseEvent对象，如图所示：
MouseEvent{isTrusted：true，screenX：572，screenY：223，.......}
但是在我们实现的debounce函数中，却只会打印 undefined
所以我们在修改一下代码：
*/
// 第三版
function debounce(func, wait){
    var timeout;
    return function(){
        var context = this;
        var args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context,args)
        },wait)
    }
}
/*
到此为止，我们修复了两个小问题：
1.this 指向
2.event 对象
*/
