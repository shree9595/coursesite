import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../helper/index";
import { getCourses } from '../faculty/helper';


function FacultyCourse() {
    const [courses, setCourses] = useState([]);
    const { user, token } = isAutheticated();

    const preload = () => {
        return getCourses().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCourses(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);
    console.log(setCourses);



    return (
        <Base title="Welcome admin" description="Manage Course here">
            <h2 className="mb-4">All Users</h2>
            <Link className="btn btn-info" to={`/`}>
                <span className="">Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total User</h2>

                    {courses.map((course, index) => {
                        return (
                            <div key="index" className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h6 className=" text-left">Name</h6>
                                    <h3 className=" text-left">{course.name}</h3>
                                </div>
                                <div className="col-2">
                                    <h6 className=" text-left">Aadhar Number</h6>
                                    <h3 className=" text-left">{course.courseDept}</h3>
                                </div>
                                <div className="col-2">
                                    <h6 className=" text-left">Date</h6>
                                    <h3 className=" text-left"> {course.description}</h3>
                                </div>
                                {/* <div className="col-2">
                                    <h6 className=" text-left">courseTeam:</h6>
                                    <h3 className=" text-left">  {course.courseTeam}</h3>
                                </div>
                                <div className="col-2">
                                    <h6 className=" text-left">Room:</h6>
                                    <h3 className=" text-left">{course.room}</h3>
                                </div> */}

                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
}

export default FacultyCourse;
