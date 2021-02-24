// store
function createStore (initState) {
    var state = initState || {};
    var list = [];


    function getState () {
        return state;
    }

    // dispatch 通过传参数， 改变 state 状态
    // action => { type: 'text, value:'王' }
    function dispatch(action) {
        state[action.type] = action.text;
        list.forEach(function (func, index) {func()});
    }


    function subscribe (func) {
        list.push(func);
    }
    return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
    }
}



