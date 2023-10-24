import courseService from "../services/courseService";


let handleGetAllCourses = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            courses: []
        })
    }
    let courses = await courseService.getAllCourses(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        courses
    })

}

let handleCreateNewCourse = async (req, res) => {
    let message = await courseService.createNewCourse(req.body);
    return res.status(200).json(message);
}
let handleDeleteCourse = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await courseService.deleteCourse(req.body.id);
    return res.status(200).json(message);
}
let handleEditCourse = async (req, res) => {
    let data = req.body;
    let message = await courseService.updateCourseData(data);
    return res.status(200).json(message)
}

let getTopCourseHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await courseService.getTopCourseHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }

}
let postDetailCourse = async (req, res) => {
    try {
        let response = await courseService.saveDetailCourse(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getDetailCourseById = async (req, res) => {
    try {
        let infor = await courseService.getDetailCourseByIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}


module.exports = {
    handleGetAllCourses: handleGetAllCourses,
    handleCreateNewCourse: handleCreateNewCourse,
    handleEditCourse: handleEditCourse,
    handleDeleteCourse: handleDeleteCourse,
    getTopCourseHome: getTopCourseHome,
    postDetailCourse: postDetailCourse,
    getDetailCourseById: getDetailCourseById
}