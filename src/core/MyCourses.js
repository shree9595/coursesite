import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../helper/index";
import { getRegister } from "./registerHelper";
import { AP } from "../backend";



function MyCourses() {
    const [courses, setCourses] = useState([]);
    const { user, token } = isAutheticated();


    useEffect(() => {

    }, []);
    console.log(courses);

    const submitRequest = async (e) => {


        const response = await fetch(`${AP}/access`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        });

        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Message Sent.");

        } else if (resData.status === 'fail') {
            alert("Message failed to send.")
        }

    }
    const pushRequest = async (e) => {


        const response = await fetch(`${AP}/api/not`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        });

        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Message Sent.");

        } else if (resData.status === 'fail') {
            alert("Message failed to send.")
        }

    }

    const nasikMail = async (e) => {


        const response = await fetch(`${AP}/access`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        });

        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Message Sent.");

        } else if (resData.status === 'fail') {
            alert("Message failed to send.")
        }

    }
    const nasikPush = async (e) => {


        const response = await fetch(`${AP}/api/nasikpush`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        });

        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Message Sent.");

        } else if (resData.status === 'fail') {
            alert("Message failed to send.")
        }

    }

    return (
        <Base title="Welcome admin" description="Manage Course here">
            <h2 className="mb-4">All Course:</h2>
            <Link className="btn btn-info" to={`/profile`}>
                <span className="">Profile</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total  Course</h2>

                    {/* {courses.map((course, index) => { */}

                    <div key="index" className="row text-center mb-2 ">
                        <div className="col-4">
                            <h6 className=" text-left">Jalgaon:</h6>
                            <h3 className=" text-left"></h3>
                        </div>
                        <div className="col-2">
                            <h6 className=" text-left">courseDep:</h6>
                            <button onClick={submitRequest} >Mail</button>
                        </div>
                        <div className="col-2">
                            <h6 className=" text-left">waitlistCapacity:</h6>
                            <button onClick={pushRequest} >Push</button>
                        </div>


                    </div>


                    <div key="index" className="row text-center mb-2 ">
                        <div className="col-4">
                            <h6 className=" text-left">nasik:</h6>
                            <h3 className=" text-left"></h3>
                        </div>

                        <div className="col-2">
                            <h6 className=" text-left">courseTeam:</h6>
                            <button onClick={nasikMail} >Mail</button>
                        </div>
                        <div className="col-2">
                            <h6 className=" text-left">Room:</h6>
                            <button onClick={nasikPush} >Push</button>
                        </div>

                    </div>

                    {/* })} */}
                </div>
            </div>
        </Base>
    );
}

export default MyCourses;
