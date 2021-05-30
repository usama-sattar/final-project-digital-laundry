import React from "react";
import axios from "axios";
import "../navbar.css";

function RiderTabelView({ rider, key }) {
  const deleteRider = (id) => {
    axios.delete(`/riders/delete/${id}`).then((res) => console.log(res));
  };
  return (
    <div>
      <tbody>
        <tr>
          <td>{rider._id}</td>
          <td>{rider.name}</td>
          <td>{rider.phone}</td>
          <td>{rider.cnic}</td>
          <td>{rider.license}</td>
          <td>
            <i
              className="fas fa-trash"
              style={{ color: "red" }}
              onClick={() => deleteRider(rider._id)}
            ></i>
          </td>
        </tr>
      </tbody>

      <div className="row">
        <div className="col-2">{rider._id}</div>
        <div className="col-2">{rider.name}</div>
        <div className="col-2">{rider.phone}</div>
        <div className="col-2">{rider.cnic}</div>
        <div className="col-2">{rider.license}</div>
        <div className="col-2">
          <i
            className="fas fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteRider(rider._id)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default RiderTabelView;
