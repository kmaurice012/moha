import mysql from 'mysql2';
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'moha',
});
connection.connect((err)=>{
    if(!err){
        console.log("Connnected");
    }
    else{
        console.log(err,"There was an error connecting to the serve");
    }
})
export default connection