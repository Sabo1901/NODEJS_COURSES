import { reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from 'bcrypt';
import res from "express/lib/response";


let getAllCourses = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let courses = '';
            if (courseId === 'ALL') {
                courses = await db.Course.findAll({
                    // attributes: {
                    //     exclude: ['price']
                    // }
                })
            } if (courseId && courseId !== 'ALL') {
                courses = await db.Course.findOne({
                    where: { id: courseId }

                })
            }
            resolve(courses)
        } catch (e) {
            reject(e);
        }
    })

}
let createNewCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Course.create({
                nameCourse: data.nameCourse,
                lecturers: data.lecturers,
                detail: data.detail,
                describe: data.describe,
                tantamount: data.tantamount,
                viewed: data.viewed,
                image: data.avatar

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
let deleteCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        let foundCourse = await db.Course.findOne({
            where: { id: courseId },
            raw: false
        })
        if (!foundCourse) {
            resolve({
                errCode: 2,
                errMessage: `The Course isn't exits`
            })
        }

        await db.Course.destroy({
            where: { id: courseId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The Course is deleted'
        })
    })
}
let updateCourseData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let course = await db.Course.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (course) {
                course.nameCourse = data.nameCourse;
                course.lecturers = data.lecturers;
                course.detail = data.detail;
                course.describe = data.describe;
                course.tantamount = data.tantamount;
                course.viewed = data.viewed;

                if (data.avatar) {
                    course.image = data.avatar;
                }
                await course.save();

                resolve({
                    errCode: 0,
                    message: 'Update ther course succeeds!'
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
let getTopCourseHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let courses = await db.Course.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: courses
            })
        } catch (e) {
            reject(e);
        }
    })
}
let saveDetailCourse = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.courseId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        courseId: inputData.courseId,
                    })
                } else if (inputData.action === 'EDIT') {
                    let courseMarkdown = await db.Markdown.findOne({
                        where: { courseId: inputData.courseId },
                        raw: false
                    })
                    if (courseMarkdown) {
                        courseMarkdown.contentHTML = inputData.contentHTML;
                        courseMarkdown.contentMarkdown = inputData.contentMarkdown;
                        courseMarkdown.description = inputData.description;
                        courseMarkdown.updateAt = new Date();
                        await courseMarkdown.save()
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save detail course succeed'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailCourseByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Course.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['detail']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
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


module.exports = {
    getAllCourses: getAllCourses,
    createNewCourse: createNewCourse,
    deleteCourse: deleteCourse,
    updateCourseData: updateCourseData,
    getTopCourseHome: getTopCourseHome,
    saveDetailCourse: saveDetailCourse,
    getDetailCourseByIdService: getDetailCourseByIdService


}