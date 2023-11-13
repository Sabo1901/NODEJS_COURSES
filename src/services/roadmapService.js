import { reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from 'bcrypt';
import res from "express/lib/response";


let getAllRoadmaps = (roadmapId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let roadmaps = '';
            roadmaps = await db.Roadmap.findAll({
                where: { scholasticId: roadmapId },
                // attributes: {
                //     exclude: ['price']
                // }
            })

            resolve(roadmaps)
        } catch (e) {
            reject(e);
        }
    })

}


let createNewRoadmap = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Roadmap.create({
                semester: data.semester,
                credit: data.credit,
                prerequisite: data.prerequisite,
                courseId: data.courseId,
                scholasticId: data.scholasticId,
            })
            resolve({
                errCode: 0,
                message: 'OK',
            })

        } catch (e) {
            reject(e);
        }
    })
}
let deleteRoadmap = (roadmapId) => {
    return new Promise(async (resolve, reject) => {
        let foundRoadmap = await db.Roadmap.findOne({
            where: { id: roadmapId },
            raw: false
        })
        if (!foundRoadmap) {
            resolve({
                errCode: 2,
                errMessage: `The Roadmap isn't exits`
            })
        }

        await db.Roadmap.destroy({
            where: { id: roadmapId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The Roadmap is deleted'
        })
    })
}
let updateRoadmapData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let roadmap = await db.Roadmap.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (roadmap) {
                roadmap.semester = data.semester;
                roadmap.credit = data.credit;
                roadmap.prerequisite = data.prerequisite;
                roadmap.courseId = data.courseId;
                roadmap.scholasticId = data.scholasticId;

                await roadmap.save();

                resolve({
                    errCode: 0,
                    message: 'Update ther roadmap succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Roadmap's not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getDetailScholasticByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Scholastic.findOne({
                    where: {
                        id: inputId
                    },
                    // attributes: {
                    //     exclude: ['detail']
                    // },
                    // include: [
                    //     { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] }
                    // ],
                    raw: false,
                    nest: true
                })
                if (data && data.diagram) {
                    data.diagram = new Buffer(data.diagram, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}



let getAllScholastics = (scholasticId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let scholastics = '';
            if (scholasticId === 'ALL') {
                scholastics = await db.Scholastic.findAll({
                    // attributes: {
                    //     exclude: ['price']
                    // }
                })
            } if (scholasticId && scholasticId !== 'ALL') {
                scholastics = await db.Scholastic.findOne({
                    where: { id: scholasticId }

                })
            }
            resolve(scholastics)
        } catch (e) {
            reject(e);
        }
    })

}

let createNewScholastic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Scholastic.create({
                prerequisiteId: data.prerequisiteId,
                scholastic: data.scholastic,
                diagram: data.avatar
            })
            resolve({
                errCode: 0,
                message: 'OK',
            })

        } catch (e) {
            reject(e);
        }
    })
}
let deleteScholastic = (scholasticId) => {
    return new Promise(async (resolve, reject) => {
        let foundScholastic = await db.Scholastic.findOne({
            where: { id: scholasticId },
            raw: false
        })
        if (!foundScholastic) {
            resolve({
                errCode: 2,
                errMessage: `The Scholastic isn't exits`
            })
        }

        await db.Scholastic.destroy({
            where: { id: scholasticId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The Scholastic is deleted'
        })
    })
}
let updateScholasticData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let scholastic = await db.Scholastic.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (scholastic) {
                scholastic.prerequisiteId = data.prerequisiteId;
                scholastic.scholastic = data.scholastic;

                if (data.avatar) {
                    scholastic.diagram = data.avatar;
                }
                await scholastic.save();

                resolve({
                    errCode: 0,
                    message: 'Update ther scholastic succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Scholastic's not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getAllRoadmaps: getAllRoadmaps,
    getAllScholastics: getAllScholastics,
    createNewScholastic: createNewScholastic,
    deleteScholastic: deleteScholastic,
    updateScholasticData: updateScholasticData,
    createNewRoadmap: createNewRoadmap,
    deleteRoadmap: deleteRoadmap,
    updateRoadmapData: updateRoadmapData,
    getDetailScholasticByIdService: getDetailScholasticByIdService
}