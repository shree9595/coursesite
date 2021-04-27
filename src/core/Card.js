import React, { useState, useEffect } from "react";
// import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { isAutheticated } from "../helper";
import { register } from "./registerHelper";


const Card = ({
  course,
  Register = true,
 
  setReload = f => f,
  //   function(f){return f}
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);

  const name = course ? course.name : "Default Course";
  const courseDept = course ? course.courseDept : "Default description";
  const room = course ? course.room : "DEFAULT";

  const { user, token } = isAutheticated()

  const addToCart = () => {

    register(user._id, token, course).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setRedirect(true)
      }
    })

   
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/MyCourses" />;
    }
  };

  const showRagister = Register => {
    return (
      Register && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Register
        </button>
      )
    );
  };


  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">Course Name:  {name}</div>
      <div className="card-body">
        {getARedirect(redirect)}

        <p className="lead font-weight-normal text-wrap">
          Course Dept: {courseDept}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4"> Room:  {room}</p>
        <div className="row">
          <div className="col-12">{showRagister(Register)}</div>

        </div>
      </div>
    </div>
  );
};

export default Card;
