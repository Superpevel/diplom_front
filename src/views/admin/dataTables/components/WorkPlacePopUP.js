import React from 'react';
import Popup from 'reactjs-popup';

const onSubmit = (event) => {
    event.preventDefault(event);
    try {
        let res = fetch("http://localhost:8007/api/doors/work_place", {
          method: "POST",
          body: JSON.stringify({
            user_id: event.target.user_id.value,
            door_id: Number(event.target.door_id.value),
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
    trigger={<button className="button"> Создать Рабочее Место</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header" text-align="center"> Создание Рабочего места</div>
        <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="login">user_id</label>
            <input className="form-control" id="user_id" />
        </div>
        <div>
            <label htmlFor="door_id">ID двери</label>
            <input id="door_id" />
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