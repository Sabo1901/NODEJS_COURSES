import roadmapService from "../services/roadmapService";


let handleGetAllRoadmaps = async (req, res) => {
    let id = req.query.scholasticId;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            roadmaps: []
        })
    }
    let roadmaps = await roadmapService.getAllRoadmaps(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        roadmaps
    })

}
let handleGetRoadmaps = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            roadmaps: []
        })
    }
    let roadmaps = await roadmapService.getRoadmaps(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        roadmaps
    })

}



let handleCreateNewRoadmap = async (req, res) => {
    let message = await roadmapService.createNewRoadmap(req.body);
    return res.status(200).json(message);
}
let handleDeleteRoadmap = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await roadmapService.deleteRoadmap(req.body.id);
    return res.status(200).json(message);
}
let handleEditRoadmap = async (req, res) => {
    let data = req.body;
    let message = await roadmapService.updateRoadmapData(data);
    return res.status(200).json(message)
}


//Scholastics

let handleGetAllScholastics = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            scholastics: []
        })
    }
    let scholastics = await roadmapService.getAllScholastics(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        scholastics
    })

}
let handleCreateNewScholastic = async (req, res) => {
    let message = await roadmapService.createNewScholastic(req.body);
    return res.status(200).json(message);
}
let handleDeleteScholastic = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await roadmapService.deleteScholastic(req.body.id);
    return res.status(200).json(message);
}
let handleEditScholastic = async (req, res) => {
    let data = req.body;
    let message = await roadmapService.updateScholasticData(data);
    return res.status(200).json(message)
}
let getDetailScholasticById = async (req, res) => {
    try {
        let infor = await roadmapService.getDetailScholasticByIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

module.exports = {
    handleGetAllRoadmaps: handleGetAllRoadmaps,
    handleGetAllScholastics: handleGetAllScholastics,
    handleCreateNewScholastic: handleCreateNewScholastic,
    handleDeleteScholastic: handleDeleteScholastic,
    handleEditScholastic: handleEditScholastic,
    handleCreateNewRoadmap: handleCreateNewRoadmap,
    handleDeleteRoadmap: handleDeleteRoadmap,
    handleEditRoadmap: handleEditRoadmap,
    getDetailScholasticById: getDetailScholasticById,
    handleGetRoadmaps: handleGetRoadmaps
}