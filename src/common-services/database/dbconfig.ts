import {config} from 'mssql'


const dbconfig: config = {
    user: process.env.DB_USER || 'sa', // sql user
    password:  process.env.DB_PASSWORD || 'geveo123', //sql user password
    server:  process.env.DB_SERVER || '127.0.0.1', // if it does not work try- localhost
    database: process.env.DB_NAME || 'schoolDB',
    options: {
      enableArithAbort:  true,
      encrypt: true,
      trustServerCertificate: true
      // instancename: process.env.DB_INSTANCE_NAME ||  'UDITH\\MSSQLSERVEREVAL',  // SQL Server instance name,

    },
    port:  parseInt(process.env.DB_PORT) || 54181
  }

  export default dbconfig;