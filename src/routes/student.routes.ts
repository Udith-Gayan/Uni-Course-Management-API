import {Router} from 'express';
import  StudentController  from './../controllers/student.controller';

const router = Router();
const studentController = new StudentController();

router.get('/api/student', (req, res) => {
    return res.status(200).send({ message: 'Hello Students' });
});
router.get('/api/students',  studentController.getStudentList);

router.get('/api/student/search', studentController.findStudentById);

router.post('/api/student/add', studentController.addNewStudent);

router.put('/api/student/update', studentController.updateStudentById);



export default router;

