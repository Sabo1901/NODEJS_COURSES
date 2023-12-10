import { reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from 'bcrypt';
import res from "express/lib/response";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                //compare password
                let role = ['R1', 'R2'];
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName', 'id'],
                    where: { email: email, roleId: role },
                    raw: true
                    // attributes: {
                    //     include: ['email', 'roleId'],
                    // }
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other Email!`

            }
            resolve(userData)

        } catch (e) {
            reject(e)
        }
    })
}


let handleUserLoginClient = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                //compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName', 'id', 'image'],
                    where: { email: email, roleId: 'R3' },
                    raw: true
                    // attributes: {
                    //     include: ['email', 'roleId'],
                    // }
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other Email!`

            }
            resolve(userData)

        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })

}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Plz try another email!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    scholasticId: data.scholasticId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'OK',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId },
            raw: false
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: 'The user  exits'
            })
        }

        await db.User.destroy({
            where: { id: userId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The user is deleted'
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.gender = data.gender;
                user.scholasticId = data.scholasticId;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update ther user succeeds!'
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
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requied parameters !'
                });
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }


        } catch (e) {
            reject(e);
        }
    })
}

let saveCreateBlog = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Blog.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        title: inputData.title,
                        image: inputData.avatar,
                        userId: inputData.userId,

                    })
                } else if (inputData.action === 'EDIT') {
                    let userMarkdown = await db.Blog.findOne({
                        where: { userId: inputData.userId },
                        raw: false
                    })
                    if (userMarkdown) {
                        userMarkdown.contentHTML = inputData.contentHTML;
                        userMarkdown.contentMarkdown = inputData.contentMarkdown;
                        userMarkdown.title = inputData.title;
                        userMarkdown.image = inputData.avatar;
                        userMarkdown.description = inputData.description;
                        userMarkdown.updateAt = new Date();
                        await userMarkdown.save()
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

let getAllBlogs = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogs = '';
            if (blogId === 'ALL') {
                blogs = await db.Blog.findAll({
                    // attributes: {
                    //     exclude: ['password']
                    // }
                })
            } if (blogId && blogId !== 'ALL') {
                blogs = await db.Blog.findOne({
                    where: { id: blogId },
                    // attributes: {
                    //     exclude: ['password']
                    // }
                })
            }
            resolve(blogs)
        } catch (e) {
            reject(e);
        }
    })

}

let getDetailBlogByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Blog.findOne({
                    where: {
                        id: inputId
                    },
                    // attributes: {
                    //     exclude: ['detail']
                    // },
                    include: [
                        { model: db.User, attributes: ['firstName', 'lastName'] }
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
let getTopBlogHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogs = await db.Blog.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: blogs
            })
        } catch (e) {
            reject(e);
        }
    })
}
let getAllBlogsUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogs = '';
            blogs = await db.Blog.findAll({
                where: {
                    userId: userId,

                },
                // attributes: {
                //     exclude: ['password']
                // }
            })

            resolve(blogs)
        } catch (e) {
            reject(e);
        }
    })

}
let deleteBlog = (blogId) => {
    return new Promise(async (resolve, reject) => {
        let foundBlog = await db.Blog.findOne({
            where: { id: blogId },
            raw: false
        })
        if (!foundBlog) {
            resolve({
                errCode: 2,
                errMessage: `The Blog isn't exits`
            })
        }

        await db.Blog.destroy({
            where: { id: blogId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The Blog is deleted'
        })
    })
}
let updateBlogData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let blog = await db.Blog.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (blog) {
                blog.title = data.title;
                blog.contentHTML = data.contentHTML;
                blog.contentMarkdown = data.contentMarkdown;
                blog.detail = data.detail;
                blog.description = data.description;
                if (data.avatar) {
                    blog.image = data.avatar;
                }
                await blog.save();

                resolve({
                    errCode: 0,
                    message: 'Update ther blog succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Blog's not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getDetailUserByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    // attributes: {
                    //     exclude: ['detail']
                    // },
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
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    handleUserLoginClient: handleUserLoginClient,
    saveCreateBlog: saveCreateBlog,
    getAllBlogs: getAllBlogs,
    getDetailBlogByIdService: getDetailBlogByIdService,
    getTopBlogHomeService: getTopBlogHomeService,
    getAllBlogsUser: getAllBlogsUser,
    deleteBlog: deleteBlog,
    updateBlogData: updateBlogData,
    getDetailUserByIdService: getDetailUserByIdService
}