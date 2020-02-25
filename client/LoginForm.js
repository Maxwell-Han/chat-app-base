import React from 'react'

const LoginForm = (props) => {
  return (
    <div>
      <h4>Log in via OAuth</h4>
      <div>
        <form method="get" action="/auth/google">
          <button type="submit">Login With Google</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
