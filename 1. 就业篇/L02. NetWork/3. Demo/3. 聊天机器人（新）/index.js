var inpBtn = document.getElementById('inp-btn');
var inpText = document.getElementById('inp-text');
var content = document.querySelector('.content');

inpBtn.onclick = function (e) {
    var val = inpText.value;
    if (val) {
        renderDom('mine', val);
        inpText.value = '';
        ajax({
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            // url: 'http://localhost:3000/chat',    // 使用图灵机器人
            type: 'get',
            data: {
                text: val
            },
            async: true,
            success: function (res) {
                console.log(res);
                var data = JSON.parse(res);
                renderDom('robot', data.text)
            }
        })
    }
}
inpText.onkeyup = function (e) {
    console.log(e.keyCode)
    if (e.keyCode == 13) {
        inpBtn.click()
    }
}

/**
 * 渲染对话信息
 * @param {String} who 取值为mine / robot 
 * @param {*} text 
 */
function renderDom(who, text) {
    var oDiv = document.createElement('div');
    oDiv.className = who;
    oDiv.innerHTML = `
                    <img class="avator" src="${who == 'mine' ? './image/me.png' : './image/you.jpg'}"></img>
                    <div class="text">
                        ${text}
                    </div>
                `;
    content.appendChild(oDiv);
    content.scrollTop = content.scrollHeight;
}