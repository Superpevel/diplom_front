import React from 'react';
import Popup from 'reactjs-popup';

const onSubmit = (event) => {
    event.preventDefault(event);
    try {
        let res = fetch("http://localhost:8007/register", {
          method: "POST",
          body: JSON.stringify({
            login: event.target.login.value,
            email: event.target.email.value,
            password: event.target.password.value,
            rank: Number(event.target.rank.value)
          }),
          headers: {
            "Content-Type": "application/json;",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InN0cmluZyIsInBhc3N3b3JkIjoic3RyaW5nIiwidXNlcl9pZCI6MX0.eOYE-WlCU16LfHnZdxHu7zhoDdaJxR9wVnTsdNltF8s",
          },
        });
        if (res.status === 200) {
          console.log("registred");
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
  };

export default () => (
  
  
  <Popup
    trigger={<button className="button"> Создать Пользавотеля</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header" text-align="center"> Создание пользователя</div>
        <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="login">Login</label>
            <input className="form-control" id="login" />
        </div>
        <div>
            <label htmlFor="email">Email address</label>
            <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" />
        </div>
        <div className="form-group">
            <label htmlFor="rank">Rank</label>
            <input id="rank" />
        </div>
        
        <div >
        <button className="form-control btn btn-primary" type="submit">
        Submit
        </button>
        </div>
        </form>
        <div className="actions">
          {/* <Popup
            trigger={<button className="button"> Hint </button>}
            position="top center"
            nested
          >
            <span>
              Создайте Пользавотеля
            </span>
          </Popup> */}
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Popup>
);