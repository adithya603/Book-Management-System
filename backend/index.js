// If you get {"code":"PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR","fatal":false} type this: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password_here'; into the MYSQL workbench file --> new query tab and click the middle lightning bolt. Then restart your node server.
//npm i cors

//for "import" to work include "type":"module". Ecma Script.

import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "linux123",
    database: "test"
})

app.use(express.json());  //Middleware (when we post data from the browser, It processes the raw data sent in the body of HTTP requests and converts it to JSON format, making it accessible via req.body)
app.use(cors())  //[CROSS ORIGIN RESOURCE SHARING] It allows your server to accept requests from different origins (e.g., different domains, ports, or protocols). This is particularly useful when you have a frontend (like a React application) running on a different server than your backend

// express.json(): This middleware is essential when you're dealing with APIs that consume JSON data. Without this middleware, the body of the request would not be automatically parsed into a usable JSON object, making it difficult to work with the data in your application.
// cors(): This middleware is crucial for enabling CORS in your application. CORS is a security feature implemented by browsers to restrict how web pages can make requests to different domains. By using this middleware, you can configure your server to handle requests from specific origins or allow requests from all origins.

app.get("/", function(req, res){   //No use until you do localhost:8800
    res.send("This is backend")
})

app.get("/books", function(req, res){
    const q = "SELECT * FROM books"
    
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", function(req, res){
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book was created successfully")
    })
})

app.delete("/books/:id", function(req, res){
    const bookId = req.params.id;    //params represents the endpoint url
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book was deleted successfully")
    })
})

app.put("/books/:id", function(req, res){
    const bookId = req.params.id;    //params represents the endpoint url. req.params is an object containing route parameters defined in the route path. 
    const q = "UPDATE books SET `title` =?, `desc`=?, `cover` = ? WHERE id = ?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q, [...values, bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated successfully.")
    })
})

app.listen(8800,function(){
    console.log("Backend connected!")
})