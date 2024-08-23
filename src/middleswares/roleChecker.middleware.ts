import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Router } from 'express';
import database from './../common-services/database/database';
import {Int} from 'mssql';


const roleCheckerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.headers)
        const employeeId = req.headers['employeeid']; // Retrieve the employeeId from the header

        if (!employeeId) {
            return res.status(400).send({ error: 'Missing employeeId header' });
        }

        // Query the database to get the role of the employee
        const pool = await database.connect();
        const result = await pool.request()
            .input('employeeId', Int, employeeId) // Adjust the type as necessary
            .query('SELECT Role FROM Employee WHERE Id = @employeeId');

        console.log(result)
        if (result.recordset.length === 0) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        // Attach the role to the request headers
        const role = result.recordset[0].Role;
        req.headers.role = role;

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error('Error in role middleware:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

export default roleCheckerMiddleware;