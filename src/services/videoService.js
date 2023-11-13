import { reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from 'bcrypt';
import res from "express/lib/response";


let getAllVideos = (videoId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let videos = '';
            if (videoId === 'ALL') {
                videos = await db.Video.findAll({
                    // attributes: {
                    //     exclude: ['price']
                    // }
                })
            } if (videoId && videoId !== 'ALL') {
                videos = await db.Video.findOne({
                    where: { id: videoId }

                })
            }
            resolve(videos)
        } catch (e) {
            reject(e);
        }
    })

}
let createNewVideo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Video.create({
                courseId: data.courseId,
                linkVideo: data.linkVideo,
                chapter: data.chapter,
                titleArticle: data.titleArticle,

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
let deleteVideo = (videoId) => {
    return new Promise(async (resolve, reject) => {
        let foundVideo = await db.Video.findOne({
            where: { id: videoId },
            raw: false
        })
        if (!foundVideo) {
            resolve({
                errCode: 2,
                errMessage: `The Video isn't exits`
            })
        }

        await db.Video.destroy({
            where: { id: videoId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The Video is deleted'
        })
    })
}
let updateVideoData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let video = await db.Video.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (video) {
                video.courseId = data.courseId;
                video.linkVideo = data.linkVideo;
                video.chapter = data.chapter;
                video.titleArticle = data.titleArticle;

                await video.save();

                resolve({
                    errCode: 0,
                    message: 'Update ther video succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllVideosCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let videos = '';

            videos = await db.Video.findAll({
                where: {
                    courseId: courseId,

                },
                // attributes: {
                //     exclude: ['id', 'courseId', 'chapter', 'linkVideo', 'createdAt', 'updatedAt']
                // }
            })

            resolve(videos)
        } catch (e) {
            reject(e);
        }
    })

}

module.exports = {
    getAllVideos: getAllVideos,
    createNewVideo: createNewVideo,
    deleteVideo: deleteVideo,
    updateVideoData: updateVideoData,
    getAllVideosCourse: getAllVideosCourse



}