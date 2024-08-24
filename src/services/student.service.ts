
import StudentDto from './../dto/studentDto';
import database from './../common-services/database/database'
import { DateTime, DateTime2 } from 'mssql';



export class StudentService {
    
    students: StudentDto[] = [
        {
          id: 1,
          name: "Alice Johnson",
          address: "123 Maple Street, Springfield",
          age: 20
        },
        {
          id: 2,
          name: "Bob Smith",
          address: "456 Oak Avenue, Greenfield",
          age: 22
        },
        {
          id: 3,
          name: "Carol Williams",
          address: "789 Pine Lane, Riverdale",
          age: 19
        },
        {
          id: 4,
          name: "David Brown",
          address: "101 Birch Road, Lakeside",
          age: 21
        },
        {
          id: 5,
          name: "Eva Davis",
          address: "202 Cedar Street, Hilltown",
          age: 23
        }
      ];
    
    
     getStudentList() {

        try {


            // const query = `SELECT * from Student`;
            // const studentListRecords: any[] = (await database.runQuery(query));
    
            // let studentList: StudentDto[] = [];
            // if(studentListRecords && studentListRecords.length > 0) {
            //     studentList = studentListRecords.map(st => ({id: st.Id, address: st.Address, age: st.Age, name: st.Name}))
            // }
    
            return this.students;
            
        } catch (error) {
            console.log(error);
            throw new Error("Error occrred when getting student list.")
        }

    }

    findStudentById(id: number): any {
        try {
            // const query = `SELECT * from Student where Id = @studentId`;
            // const recordSet: any = await database.runQuery(query, {studentId: id});
            // if(recordSet.length === 1) {
            //     const student = new StudentDto();
            //     student.id = recordSet[0].Id;
            //     student.address = recordSet[0].Address;
            //     student.age = recordSet[0].Age;
            //     student.name = recordSet[0].Name;

            //     return student;

            // } else {
            //     return null;
            // }

            const student = this.students.find(st => st.id === id);
            if(student) {
                return student;
            } else {
                return [];
            }

        } catch (error) {
            throw new Error(`Error occrred when finding student. ${error.message}`)
        }
    }

    updateStudent(id: number, data: any) {
        try {

            if(id < 1 || id > this.students.length){
                throw new Error("Invalid Student ID.");
            }

            this.students.forEach((student, index) => {
                if(student.id === id) {
                    this.students[index] = {...student, ...data}
                }
            });

            return this.students;

        } catch (error) {
            throw new Error(`Error occrred when updating student. ${error.message}`)
        }
    }

    // async updateStudentById(id: number, concurrencyKey: string, data: any, modifiedById: number) {
        
    //     try {

    //         if(id < 0){
    //             throw new Error("Invalid Student ID.");
    //         }

    //         const updatedData = {
    //             Name: data.name,
    //             Age: data.age,
    //             ModifiedAt: new Date().toISOString(),
    //             ModifiedBy: modifiedById
    //         }

    //         const res =  await database.updateDataWithConcurrency('Student', id, updatedData, concurrencyKey);
    //         return res;

    //     } catch (error) {
    //         throw new Error(`Error occrred when updating student. ${error.message}`)
    //     }
        
    // }

    addNewStudent(data: any) {
        try {
            // Do the validations

            const newStudent: StudentDto = {
                id: this.students.length + 1,
                name: data.name,
                address: data.address,
                age: data.age  
            }

            this.students.push(newStudent)

            // const res = await database.insertData('Student', newStudent);

            return this.students;
        } catch (error) {
            throw new Error(`Error occrred when adding student. ${error.message}`)
        }
    }


}