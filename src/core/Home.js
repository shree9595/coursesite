import React, { useState, useEffect } from "react";
// import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { CreateCourse, getCourses } from "../faculty/helper";
import { isAutheticated } from "../helper";
import { Link } from "react-router-dom";


export default function Home() {
    const { user, token } = isAutheticated();

    const [values, setValues] = useState({
        name: "",
        courseDept: "",
        description: "",
        room: "",
        waitlistCapacity: "",
        courseTeam: "",
        loading: false,
        error: "",
        createCourse: "",
        getaRedirect: false,
        success: false

    });

    const {
        name,
        courseDept,
        description,
        room,
        waitlistCapacity,
        courseTeam,
        success,
        loading,
        error,
        createCourse,
        getaRedirect,

    } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };





    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        CreateCourse(user._id, token, {
            name, courseDept,
            description,
            room,
            waitlistCapacity,
            courseTeam,
        }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    courseDept: "",
                    description: "",
                    room: "",
                    waitlistCapacity: "",
                    courseTeam: "",
                    loading: false,
                    createCourse: data.name,
                    success: true
                });
            }
        });
    };


    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: success ? "" : "none" }}
        >
            <h4>{createCourse} created successfully</h4>
        </div>
    );

    const createCourseForm = () => (
        <form>

            <div className="form-group">
                <label className="text-light">User Name</label>
                <input
                    className="form-control"
                    onChange={handleChange("name")}
                    type="text"
                    placeholder="Name"
                    value={name}
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-light">Aadhar Number</label>
                <input
                    className="form-control"
                    onChange={handleChange("courseDept")}
                    type="text"
                    placeholder="Adhar Number"
                    value={courseDept}
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-light">Birth Date</label>
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Birth Date"
                    value={description}
                    required
                />
            </div>

            <div className="form-group">
                <label className="text-light">Capture1</label>
                <input
                    className="form-control"
                    onChange={handleChange("room")}
                    type="text"
                    placeholder="Capture1"
                    value={room}
                />
            </div>
            <div className="form-group">
                <label className="text-light">Capture2</label>
                <input
                    className="form-control"
                    onChange={handleChange("waitlistCapacity")}
                    type="text"
                    placeholder="Capture2"
                    value={waitlistCapacity}
                />
            </div>
            <div className="form-group">
                <label className="text-light">Capture3</label>
                <input
                    className="form-control"
                    onChange={handleChange("courseTeam")}
                    type="text"
                    placeholder="Capture3"
                    value={courseTeam}
                />
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                Save User
            </button>
        </form>
    );

    return (
        <Base
            title="Verify Aadhar Details"
            description="Aadhar"
            className="container bg-info p-4"
        >
            <Link to="/facultyCourse" className="btn btn-md btn-dark mb-3">
                Show All Users
            </Link>
            {successMessage()}
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {createCourseForm()}
                </div>
            </div>

        </Base>
    );

}
