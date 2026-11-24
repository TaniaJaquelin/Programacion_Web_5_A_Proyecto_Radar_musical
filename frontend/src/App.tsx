import "./App.css";

function App() {
    return (
        <>
            <section>
                <div className="login-container">
                    <div className="sign-in-area">
                        <img src="./images/login/logo_icon.svg" />
                        <h1>Radar Musical</h1>
                        <p>Discover your favorite music style and local artists</p>

                        <form className="form-container" action="/api/v1/auth/login" method="post">
                            <label className="field-label">Email address</label>
                            <input className="field-input" id="loginEmail" type="email" placeholder="name@example.com" />

                            <label className="field-label">Password</label>
                            <input className="field-input" id="password" type="password" placeholder="Enter password" />

                            <button className="input-button" type="button">Sign In</button>
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