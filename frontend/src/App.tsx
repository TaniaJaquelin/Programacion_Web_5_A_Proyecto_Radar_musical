import { useState } from "react";
import "./App.css";
import { loginUser } from "./auth/services/auth.service";

function App() {
    //creating login hooks
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    //creating login events
    const manageEmail = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(event.target.value);
    }

    const managePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const sendForm = async (event: React.SubmitEvent<HTMLFormElement>)=> {
        //this avoid to refresh the page (inputs won't errase)
        event.preventDefault();
        //we use the auth.service to do a post request
        const login = await loginUser({email,password});
        console.log(login);
    }

    return (
        <>
            <section>
                <div className="login-container">
                    <div className="sign-in-area">
                        <img src="./images/login/logo_icon.svg" />
                        <h1>Radar Musical</h1>
                        <p>Discover your favorite music style and local artists</p>

                        <form className="form-container"
                            onSubmit={sendForm}
                        >
                            <label className="field-label">Email address</label>
                            <input className="field-input" id="loginEmail" type="email" placeholder="name@example.com" 
                                value={email}
                                onChange={manageEmail}
                            />

                            <label className="field-label">Password</label>
                            <input className="field-input" id="password" type="password" placeholder="Enter password" 
                                value={password}
                                onChange={managePassword}
                            />

                            <button className="input-button" type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="sign-up-area">
                        <p>Don't have an account? <a href=""> Sign up</a></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App