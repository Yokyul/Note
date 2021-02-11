const url = `/api/student/findAll?appkey=yuyu_1590927966045`;
fetch(url).then(resp => resp.json()).then(resp => {
    console.log(resp)
    console.log(resp.data)

})