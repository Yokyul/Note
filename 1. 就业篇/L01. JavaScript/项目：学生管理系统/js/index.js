//1.判断有没有登录
var username = getCookie('username');
if (username) {
    var user = document.getElementsByClassName('username')[0];
    user.innerText = username;
} else {
    location.href = './login.html'
}

var studentList = document.querySelector('.menu dd[data-id="student-list"]')
var tableDate = []; // 存放所有的学生数据

//2.获取学生列表数据，渲染到页面
transferDate('/api/student/findAll', {}, function (data) {
    tableDate = data
    renderTablle(data);
});






/**
 * 绑定事件。
 */
function bindEvent() {
    //通过事件委托，给所有dd元素绑定事件, 从而切换menu
    var menu = document.querySelector('.menu');
    menu.onclick = function (e) {
        var target = e.target;
        if (target.tagName == 'DD') {
            // 先给所有dd元素添加active属性
            target.classList.add('active');
            // 再去除其他兄弟节点的active属性
            var siblings = getSiblings(target);
            for (var i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }

            // 通过 data-id 切换右侧内容区
            // 将获取的dd元素内容设置 display:block
            var id = target.getAttribute('data-id');
            var showContent = document.getElementById(id);
            showContent.style.display = 'block';
            // 将其他dd元素内容设置 display:none
            var siblingsContent = getSiblings(showContent);
            for (var i = 0; i < siblingsContent.length; i++) {
                siblingsContent[i].style.display = 'none';
            }
        }
    }

    //新增学生页面
    var studentAddBtn = document.getElementById('add-submit');
    studentAddBtn.onclick = function (e) {
        e.preventDefault();
        var addStudentForm = document.getElementById('add-student-form');
        // 获取新增表单数据
        var data = getFormData(addStudentForm);
        if (data) {
            transferDate('/api/student/addStudent', data, function () {
                alert('新增成功')
                getStuList()
                studentList.click()
            });
        }
    }

    //编辑、删除功能
    var tbody = document.getElementById('tbody')
    var modal = document.getElementsByClassName('modal')[0]
    tbody.onclick = function (e) {
        if (e.target.classList.contains('edit')) {
            modal.style.display = 'block'
            // 获取当前学生索引值
            var index = e.target.dataset.index
            renderEditForm(tableDate[index])
        } else if (e.target.classList.contains('remove')) {
            var index = e.target.dataset.index
            var isDel = confirm(`确认删除吗？`)
            if (isDel) {
                transferDate('/api/student/delBySno', {
                    sNo: tableDate[index].sNo
                }, function () {
                    alert('删除成功')
                    getStuList()
                })
            }



        }
    }

    //点击修改按钮
    var studentEditBtn = document.getElementById('edit-submit')
    studentEditBtn.onclick = function (e) {
        e.preventDefault();
        var editStudentForm = document.getElementById('edit-student-form');
        // 获取修改后的表单数据
        var data = getFormData(editStudentForm);
        if (data) {
            transferDate('/api/student/updateStudent', data, function () {
                // alert('修改成功')
                modal.style.display = 'none'
                getStuList()
            })
        }
    }

    //点击空白，编辑页消失
    var modalForm = document.getElementsByClassName('modal-form')[0]
    modal.onclick = function () {
        modal.style.display = 'none'
    }
    modalForm.onclick = function (e) {
        e.stopPropagation()
    }

}
bindEvent();



/**
 * 获取某一节点的所有兄弟节点(以数组形式返回)
 * @param {*} node 
 */
function getSiblings(node) {
    var parentNode = node.parentNode;
    var children = parentNode.children;
    var result = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i] != node) {
            result.push(children[i]);
        }
    }
    return result;
}

/**
 * 获取新增学生页面的表单数据(以对象形式返回)
 * @param {*} form 
 */
function getFormData(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var number = form.sNo.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if (!name || !sex || !email || !number || !birthYear || !phone || !address) {
        alert('信息填写不完全');
        return false;
    }
    // 学号 4-16位数字 
    if (!(/^\d{4,16}$/.test(number))) {
        alert('学号应为4-16位数字')
        return false;
    }
    // 出生年份 4位数字 1920-2020
    if (!(birth < 2020 && birth > 1920)) {
        alert('出生年份应为4位数字，且在1920-2020之间')
        return false;
    }
    return {
        name: name,
        sex: sex,
        email: email,
        sNo: number,
        birth: birth,
        phone: phone,
        address: address,
    }
}

/**
 * 编辑表单的数据回填
 * @param {*} data 
 */
function renderEditForm(data) {
    var editForm = document.getElementById('edit-student-form');
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];
        }
    }
}

/**
 * 渲染函数
 * @param {*} data 
 */
function renderTablle(data) {
    var str = '';
    for (i = 0; i < data.length; i++) {
        str += `<tr>
        <td>${data[i].sNo}</td>
        <td>${data[i].name}</td>
        <td>${data[i].sex == 1 ? '女' : '男'}</td>
        <td>${data[i].email}</td>
        <td>${new Date().getFullYear() - data[i].birth}</td>
        <td>${data[i].phone}</td>
        <td>${data[i].address}</td>
        <td>
            <button class="btn edit" data-index="${i}">编辑</button>
            <button class="btn remove" data-index="${i}">删除</button>
        </td>
    </tr> `
        var tBody = document.getElementById('tbody')
        tBody.innerHTML = str;
    }
}

/**
 * 发送ajax网络请求
 * @param {str} url 
 * @param {obj} data 
 * @param {fun} cb 
 */
function transferDate(url, data, cb) {
    var str = 'appkey=yuyu_1590927966045';
    for (var prop in data) {
        str += '&' + prop + '=' + data[prop];
    }
    ajax("GET", 'http://open.duyiedu.com' + url, str, function (result) {
        if (result.status == 'success') {
            cb(result.data);
        } else {
            alert(result.msg);
        }
    }, true)
}