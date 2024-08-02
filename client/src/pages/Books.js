import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

function Books(){
    const [books, setBooks] = useState([])

    useEffect(()=> {  //we use useEffect bcoz whenever we reload the page, Data from the DB has to be fetched and updated.
         const handleFetch = async function () {
            try{
                //axios library is used for making asynchronous HTTP requests to the backend API.
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
            }catch(err){
                console.log(err)
            }
        }

        handleFetch();

    },[])  //[] refers to the dependency array, all the components to be changed on reload is put in this array.

    async function handleDelete(id){
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <h1>Books store</h1>
            <div className="books">
                {books.map(function(data) {
                    return(
                        <div className="book">
                            {data.title && <img src={"nothing"} alt=""/>}
                            <h2>{data.title}</h2>
                            <p>{data.desc}</p>
                            <button className="delete" onClick = {() => handleDelete(data.id)}>Delete</button>
                            <button className="update"><Link to = {`/update/${data.id}`}>Update</Link></button>
                        </div>
                    )
                })}
            </div>
            <button><Link to="/add">Add new Book</Link></button>
        </div>
    )
}

export default Books