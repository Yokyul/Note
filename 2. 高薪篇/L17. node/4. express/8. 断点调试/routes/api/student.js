const express = require("express");
const router = express.Router();
const stuServ = require("../../services/studentService");
const { asyncHandler } = require("../getSendResult");       //服务器返回消息所要求的的统一格式。

// 分页获取学生信息
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const sex = req.query.sex || -1;
        const name = req.query.name || "";
        return await stuServ.getStudents(page, limit, sex, name);
    })
);

// 获取单个学生信息
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        return await stuServ.getStudentById(req.params.id);
    })
);

// 添加学生
router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        return await stuServ.addStudent(req.body);
    })
);

// 删除单个学生
router.delete(
    "/:id",
    asyncHandler(async (req, res, next) => {
        return await stuServ.deleteStudent(req.params.id);
    })
);

// 修改单个学生信息
router.put(
    "/:id",
    asyncHandler(async (req, res, next) => {
        return await stuServ.updateStudent(req.params.id, req.body);
    })
);

module.exports = router;
