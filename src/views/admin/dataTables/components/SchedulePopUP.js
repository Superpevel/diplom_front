import React from 'react';
import Popup from 'reactjs-popup';

const onSubmit = (event) => {
    event.preventDefault(event);
    try {
        let res = fetch("http://localhost:8007/api/doors/doors_schedule", {
          method: "POST",
          body: JSON.stringify({
            change_rank: event.target.change_rank.value,
            change_time: event.target.change_time.value,
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
    trigger={<button className="button"> Создать расписание двери</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header" text-align="center"> Создание расписание дверей</div>
        <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="login">Ранг</label>
            <input className="form-control" id="change_rank" />
        </div>
        <div>
            <label htmlFor="change_time">Время смены ранга</label>
            <input
            type="time"
            className="form-control"
            id="change_time"
            placeholder="12:00"
            />
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