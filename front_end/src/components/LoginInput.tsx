import React from 'react';

function LoginInput(props: any) {
    return (
        <div className="password-input-container">
            <input
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className="form-input"
            />
            {props.error && <span className="error-asterisk">*</span>}
        </div>
    );
}

export default LoginInput;