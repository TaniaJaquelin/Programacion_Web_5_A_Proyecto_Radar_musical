import { useState } from "react";
import "./App.css";
import { loginUser } from "./auth/services/auth.service";
import LabelInput from "./components/molecules/LabelInput";

function App() {
    //creating login hooks
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    //creating login events
    const manageEmail = (inputText:string)=>{
        setEmail(inputText);
    }

    const managePassword = (inputText:string) => {
        setPassword(inputText);
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
                            <LabelInput labelText="Email adressed" inputType="email" placeHolder="name@example.com" value={email} fnOnChange={manageEmail}/>

                            <LabelInput labelText="Password" inputType="password" placeHolder="*************" value={password} fnOnChange={managePassword}/>

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