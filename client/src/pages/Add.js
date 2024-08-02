import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add(){
    
        const [book, setBooks] = useState({
            title:" ",
            desc: " ",
            cover: " "
        })

        const navigate = useNavigate();

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
                await axios.post("http://localhost:8800/books", book)
                navigate("/")
            }catch(err){
                console.log(err)
            }
        }

        return(
            <div>
                <h1>Add new Book</h1>
                <div className="form">
                    <input type="text" placeholder="title" onChange={handleChange} name="title"  />
                    <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
                    <input type="text" placeholder="cover" onChange={handleChange} name="cover"  />
                    <button className="formButton" onClick={handleClick}>Add</button>
                </div>
            </div>
            
        )
    
}

export default Add