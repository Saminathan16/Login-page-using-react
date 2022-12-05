import {useState,useEffect} from "react";
import './App.css';

function App() {
  const initialValues={
    un:"",
    email:"",
    mobile:"",
    gender:"",
    pass:"",
    cpass:"",
    atc:""
  };
  const [fv,setfv]=useState(initialValues);
  const [isChecked, setIsChecked] = useState(false);
  const [fe,setfe]=useState({});
  const [isSubmit,setIsSubmit] =useState(false);
  const hoc = () => {
    setIsChecked(!isChecked);
  };

  const hc=(e)=>{
    const { name,value}=e.target;
    setfv({ ...fv , [name] : value });
    
  };

  const hs=(e)=>{
    e.preventDefault();
    setfe(validate(fv));
    setIsSubmit(true);
  };

  useEffect(() =>
  {
    console.log(fe);
    if(Object.keys(fe).length===0 && isSubmit)
    {
      console.log(fv);
    }
  },[fe]);

  const validate=(values) =>{
    const errors={};
    const regex = /^[\w-\.]+@([\w-]+\.)+co$/i;
    const regName= /^[A-Za-z_]+$/;
    const regphn = /^[0-9]{10}$/;
    const regpass= /^[0-9A-Za-z]{6,}$/;

    if(!values.un)
    {
      errors.us="Name Field is required"
    }
    else if(!regName.test(values.un))
    {
      errors.us="Give valid name";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } 
    else if (!regex.test(values.email)) {
      errors.email = "Give correct format email!";
    }

    if (!values.mobile) {
      errors.mobile = "Mobile is required!";
    } 
    else if (!regphn.test(values.mobile)) {
      errors.mobile = "Give correct format phone number!";
    }

    if (!values.gender) {
      errors.gender = "Choose one option";
    } 
   
    if (!values.pass) {
      errors.pass = "Password is required";
    } 
    else if (!regpass.test(values.pass)) {
      errors.pass = "Enter Minimun 6 digit passwrd!";
    }

    if (!values.cpass) {
      errors.cpass = "Password is required";
    }
    else if(values.cpass !== values.pass) {
      errors.cpass= "Confirm Password must be equal to password";

    }
    
    if (!values.atc || values.atc==="unchecked") {
      errors.atc = "Accept terms and conditions";
    }
    return errors;
  };

  return (
    <div className="container">
        {Object.keys(fe).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <div>Login</div>
      )}
        <form method='post' onSubmit={hs}>
            <div className='ui form'>
                <div className='field'>
                  <label>Name</label><br/>
                  <input type="text" id="box" name="un" value={fv.username} onChange={hc}/>
                </div>
                <p>{fe.us}</p>
                <div className='field'>
                  <label>Email</label><br/>
                  <input type="text" id="box" name="email" value={fv.email} onChange={hc}/>
                </div>
                <p>{fe.email}</p>
                <div className='field'>
                  <label>Mobile</label><br/>
                  <input type="Number" id="box" name="mobile" value={fv.mobile} onChange={hc}/>
                </div>
                <p>{fe.mobile}</p>
                <div className='field'>
                  <label>Gender</label><br/>
                  <input type="radio" name="gender" value="male" onChange={hc}/>Male
                  <input type="radio" name="gender" value="female" onChange={hc}/>Female
                </div>
                <p>{fe.gender}</p>
                <div className='field'>
                  <label>Password</label><br/>
                  <input type="password" id="box" name="pass" value={fv.pass} onChange={hc}/>
                </div>
                <p>{fe.pass}</p>
                <div className='field'>
                  <label>Confirm Password</label><br/>
                  <input type="password" id="box" name="cpass" value={fv.cpass} onChange={hc}/>
                </div>
                <p>{fe.cpass}</p>
                <div className='field'>
                  <input type="checkbox" name="atc" checked={isChecked} value={!isChecked ? "checked" : "unchecked"} onInput={hoc} onChange={hc}/>Accept terms conditions
                </div>
                <p>{fe.atc}</p>

                <input type="submit" name="submit" id="submit" value="Register"/>

            </div>
        </form>
    </div>
  );
}

export default App;
