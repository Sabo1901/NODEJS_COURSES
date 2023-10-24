import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import courseController from "../controllers/courseController";
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

    router.get('/api/get-all-courses', courseController.handleGetAllCourses);
    router.post('/api/create-new-course', courseController.handleCreateNewCourse);
    router.put('/api/edit-course', courseController.handleEditCourse);
    router.delete('/api/delete-course', courseController.handleDeleteCourse);

    router.get('/api/get-detail-courses-by-id', courseController.getDetailCourseById);
    router.post('/api/save-detail-courses', courseController.postDetailCourse);

    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/top-course-home', courseController.getTopCourseHome);




    return app.use("/", router);
}

module.exports = intitWebRoutes;