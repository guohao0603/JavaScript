function myModule() {
    //私有数据
    var msg = "GuoHao"
    //操作数据的函数
    function doSomething() {
        console.log('doSomething()',+msg.toUpperCase())
    }
    function doOtherthing() {
        console.log('doOtherthing()',+msg.toLowerCase())
    }
    return {
        doSomething: doSomething,
        doOtherthing: doOtherthing
    }

}