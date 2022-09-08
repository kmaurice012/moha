// import  express from "express";

// import connection from "./connection.js"
// import bodyParser from "body-parser";
// const app = express();
// const port = 3000;
// app.use(bodyParser.json());

// app.listen(port, function() {
//     console.log('Server is running on port ' + port);
// });
import  express from "express";
const app = express()
import bodyparser from "body-parser";
import multer from "multer";
import path from "path";
 
 
//use express static folder
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
import connection from './connection.js'
 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
//! Routes start
 
//route for Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
//@type   POST
//route for post data
app.post("/post", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        var query = "INSERT INTO users_file(file_src)VALUES(?)"
        connection.query(query, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});
 
//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))