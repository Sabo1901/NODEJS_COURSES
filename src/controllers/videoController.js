import videoService from "../services/videoService";


let handleGetAllVideos = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            videos: []
        })
    }
    let videos = await videoService.getAllVideos(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        videos
    })

}

let handleCreateNewVideo = async (req, res) => {
    let message = await videoService.createNewVideo(req.body);
    return res.status(200).json(message);
}
let handleDeleteVideo = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await videoService.deleteVideo(req.body.id);
    return res.status(200).json(message);
}
let handleEditVideo = async (req, res) => {
    let data = req.body;
    let message = await videoService.updateVideoData(data);
    return res.status(200).json(message)
}

let handleGetAllVideosCourse = async (req, res) => {
    let courseId = req.query.courseId;
    if (!courseId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            videos: []
        })
    }
    let videos = await videoService.getAllVideosCourse(courseId);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        videos
    })

}

// let getTopCourseHome = async (req, res) => {
//     let limit = req.query.limit;
//     if (!limit) limit = 10;
//     try {
//         let response = await videoService.getTopCourseHome(+limit);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server...'
//         })
//     }

// }
// let postDetailCourse = async (req, res) => {
//     try {
//         let response = await videoService.saveDetailCourse(req.body);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server...'
//         })
//     }
// }
// let getDetailCourseById = async (req, res) => {
//     try {
//         let infor = await videoService.getDetailCourseByIdService(req.query.id);
//         return res.status(200).json(infor);
//     } catch (e) {
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server...'
//         })
//     }
// }


module.exports = {
    handleGetAllVideos: handleGetAllVideos,
    handleCreateNewVideo: handleCreateNewVideo,
    handleEditVideo: handleEditVideo,
    handleDeleteVideo: handleDeleteVideo,
    handleGetAllVideosCourse: handleGetAllVideosCourse


}