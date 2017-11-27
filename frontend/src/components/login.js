import React, { Component } from 'react';
import $ from 'jquery';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {
                'username': '',
                'password': ''
            },
            success: null
        };
        this.Login = this.Login.bind(this)
    }
    Click(option) {
        this.props.callbackFromMain(option);
    }
    EditUser(e) {
        var input = this.state.input
        input.username = e.target.value
        this.setState({
            input: input
        });
    }
    EditPassword(e) {
        var input = this.state.input
        input.password = e.target.value
        this.setState({
            input: input
        });
    }
    Login(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: this.state.input,
            success: (res) => {
                if (res.success) {
                    this.props.callbackFromMain('profile') 
                }
                else {
                    this.setState({
                        success: false
                    })
                }
            },
            error: (xhr) => {
                alert("Status: "+xhr.status+ ". "+xhr.statusText)
            }
        })
    }
    render() {
        let message = null
        if (this.state.success === false) {
            message = <div class="alert alert-warning">
                        <p>Login failed. Try again.</p> 
                        <p>If you forgot your username or password, send an email to sebgrebe.code@gmail.com</p>
                      </div>
        }
        return (
            <div className="container">
            <h3>Login</h3>
            <form className="form">
                <div className="input-group">
                    <input placeholder="Username" value={this.state.input.username} onChange={(e) => this.EditUser(e)}></input>
                    <input type="password" className="input" placeholder="Password" value={this.state.input.password} onChange={(e) => this.EditPassword(e)}></input>
                </div>
                {message}
                <div className="row">
                <button className="button submit" onClick={(e) => this.Login(e)}>Login</button>
                </div>
                <div className="account_alt">Don't have an account yet? <a className="link" onClick={() => this.Click('signup')}>Sign up.</a></div>
            </form>
            </div>
            )
    }
}

export default Login