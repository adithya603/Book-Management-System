import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";


function Update(){
    
        const [book, setBooks] = useState({
            title:" ",
            desc: " ",
            cover: " "
        })

        const navigate = useNavigate();

        const location = useLocation();
        const bookId = location.pathname.split("/")[2]  //fectching id of the book to be updated

        function handleChange(e){
            setBooks(function(prev){
                return{
                    ...prev,
                    [e.target.name] : e.target.value,
                }
            })
        }

        async function handleClick(e){
            e.preventDefault();
            try{
                await axios.put(`http://localhost:8800/books/${bookId}`, book)
                navigate("/")
            }catch(err){
                console.log(err)
            }
        }

        return(
            <div>
                <h1>Update new Book</h1>
                <div className="form">
                    <input type="text" placeholder="title" onChange={handleChange} name="title"  />
                    <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
                    <input type="text" placeholder="cover" onChange={handleChange} name="cover"  />
                    <button className="formButton" onClick={handleClick}>Update</button>
                </div>
            </div>
        )
}

export default Update