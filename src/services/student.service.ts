
import StudentDto from './../dto/studentDto';
import database from './../common-services/database/database'
import { DateTime, DateTime2 } from 'mssql';



export class StudentService {
    
    async getStudentList() {
        const query = `SELECT * from Student`;
        try {
            const studentListRecords: any[] = (await database.runQuery(query));
    
            let studentList: StudentDto[] = [];
            if(studentListRecords && studentListRecords.length > 0) {
                studentList = studentListRecords.map(st => ({id: st.Id, address: st.Address, age: st.Age, name: st.Name}))
            }
    
            return studentList;
            
        } catch (error) {
            console.log(error);
            throw new Error("Error occrred when getting student list.")
        }

    }

    async findStudentById(id: number) {
        const query = `SELECT * from Student where Id = @studentId`;
        try {
            const recordSet: any = await database.runQuery(query, {studentId: id});
            if(recordSet.length === 1) {
                const student = new StudentDto();
                student.id = recordSet[0].Id;
                student.address = recordSet[0].Address;
                student.age = recordSet[0].Age;
                student.name = recordSet[0].Name;

                return student;

            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Error occrred when finding student. ${error.message}`)
        }
    }

    async updateStudentById(id: number, concurrencyKey: string, data: any, modifiedById: number) {
        
        try {

            if(id < 0){
                throw new Error("Invalid Student ID.");
            }

            const updatedData = {
                Name: data.name,
                Age: data.age,
                ModifiedAt: new Date().toISOString(),
                ModifiedBy: modifiedById
            }

            const res =  await database.updateDataWithConcurrency('Student', id, updatedData, concurrencyKey);
            return res;

        } catch (error) {
            throw new Error(`Error occrred when updating student. ${error.message}`)
        }
        
    }

    async addNewStudent(data: any) {
        try {
            // Do the validations

            const newStudent = {
                Name: data.name,
                Address: data.address,
                Age: data.age,
                Course_ID: data.courseId
            }

            const res = await database.insertData('Student', newStudent);

            return res;
        } catch (error) {
            throw new Error(`Error occrred when adding student. ${error.message}`)
        }
    }


}