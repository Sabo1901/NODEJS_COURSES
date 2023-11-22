import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import courseController from "../controllers/courseController";
import videoController from "../controllers/videoController";
import roadmapController from "../controllers/roadmapController";
let router = express.Router();

let intitWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/get-detail-users-by-id', userController.getDetailUserById);

    router.get('/api/get-all-courses', courseController.handleGetAllCourses);
    router.post('/api/create-new-course', courseController.handleCreateNewCourse);
    router.put('/api/edit-course', courseController.handleEditCourse);
    router.delete('/api/delete-course', courseController.handleDeleteCourse);

    router.get('/api/get-detail-courses-by-id', courseController.getDetailCourseById);
    router.post('/api/save-detail-courses', courseController.postDetailCourse);

    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/top-course-home', courseController.getTopCourseHome);


    router.get('/api/get-all-blogs-user', userController.handleGetAllBlogsUser);
    router.get('/api/top-blog-home', userController.getTopBlogHome);
    router.get('/api/get-detail-blogs-by-id', userController.getDetailBlogById);
    router.get('/api/get-all-blogs', userController.handleGetAllBlogs);
    router.post('/api/save-create-blog', userController.postCreateBlog);
    router.delete('/api/delete-blog', userController.handleDeleteBlog);
    router.put('/api/edit-blog', userController.handleEditBlog);
    router.post('/api/loginClient', userController.handleLoginClient);


    router.get('/api/get-all-videos', videoController.handleGetAllVideos);
    router.get('/api/get-all-videos-course', videoController.handleGetAllVideosCourse);
    router.post('/api/create-new-video', videoController.handleCreateNewVideo);
    router.put('/api/edit-video', videoController.handleEditVideo);
    router.delete('/api/delete-video', videoController.handleDeleteVideo);

    router.get('/api/get-all-roadmap', roadmapController.handleGetAllRoadmaps);
    router.post('/api/create-new-roadmap', roadmapController.handleCreateNewRoadmap);
    router.put('/api/edit-roadmap', roadmapController.handleEditRoadmap);
    router.delete('/api/delete-roadmap', roadmapController.handleDeleteRoadmap);
    router.get('/api/get-roadmaps', roadmapController.handleGetRoadmaps);


    router.get('/api/get-all-scholastic', roadmapController.handleGetAllScholastics);
    router.post('/api/create-new-scholastic', roadmapController.handleCreateNewScholastic);
    router.put('/api/edit-scholastic', roadmapController.handleEditScholastic);
    router.delete('/api/delete-scholastic', roadmapController.handleDeleteScholastic);
    router.get('/api/get-detail-scholastics-by-id', roadmapController.getDetailScholasticById);

    return app.use("/", router);
}

module.exports = intitWebRoutes;