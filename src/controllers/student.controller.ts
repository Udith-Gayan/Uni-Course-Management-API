import {Request, Response} from 'express'
import { StudentService } from './../services/student.service'

class StudentController {
   
    private readonly studentService: StudentService = new StudentService();

    constructor() {
        this.studentService = new StudentService();
    }
    
    
    
    getStudentList = async (req: Request, res: Response) => {
        const role: any = req.headers.role;
        console.log(req.headers);

        if(['Admin', 'Teacher'].includes(role)) {
            try {
                const response = await this.studentService.getStudentList();
                return res.status(200).json(response);
            } catch (error) {
                return res.status(500).send(error);
            }
        } else {
            return res.status(403).send({ message: 'Access denied' });
        }
    }

    findStudentById = async (req: Request, res: Response) => {
        const role: any = req.headers.role;
        const sId: any =  req.query["sId"];

        if(['Admin'].includes(role)) {
            try {
                const response = await this.studentService.findStudentById(parseInt(sId));
                return res.status(200).json(response);
            } catch (error) {
                return res.status(500).send(error);
            }
        } else {
            return res.status(403).send({ message: 'Access denied' });
        }
    }


    updateStudentById = async (req: Request, res: Response) => {
        const role: any = req.headers.role;
        const sId: any =  req.query["sId"];


        if(['Admin'].includes(role)) {
            try {
                const response = await this.studentService.findStudentById(parseInt(sId));
                return res.status(200).json(response);
            } catch (error) {
                return res.status(500).send(error);
            }
        } else {
            return res.status(403).send({ message: 'Access denied' });
        }


    }

    deleteStudentById() {

    }
}

export default StudentController;