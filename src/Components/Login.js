import React ,{useEffect, useState}from 'react'
import { useNavigate} from 'react-router-dom';

export default function Login(props) {

    const [cred,setCred] = useState({email:"",password:""});
    let navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            navigate("/notes");
        }
        // eslint-disable-next-line
    },[])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("https://inotebook-uuc5.onrender.com/api/auth/login",{
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email:cred.email,password:cred.password})
        });
        const json = await response.json();
        if(json.success)
        {
            localStorage.setItem("token",json.authToken)
            props.showAlert("Logged in Successfully","success");
            navigate('/notes');
        }
        else
        {
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }

    return (
        <>
        <h3 style={{textAlign:"center",marginTop:"15px"}}>Login to continue to iNotebook</h3>
        <div style={{display:"flex",justifyContent:"center"}} className = "my-5">
            <form style={{width:"500px",height:"400px"}} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={cred.email} onChange={onChange} name="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={cred.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
        </>
    )
}
