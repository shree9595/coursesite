
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
// import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAutheticated } from "../helper/index";
import { CreateCourse } from "./helper";



const AddCourse = () => {
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

    });

    const {
        name,
        courseDept,
        description,
        room,
        waitlistCapacity,
        courseTeam,
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
                    createCourse: data.name
                });
            }
        });
    };


    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createCourse ? "" : "none" }}
        >
            <h4>{createCourse} created successfully</h4>
        </div>
    );

    const createCourseForm = () => (
        <form>

            <div className="form-group">
                <label className="text-light">Name</label>
                <input
                    className="form-control"
                    onChange={handleChange("name")}
                    type="text"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-light">courseDept</label>
                <input
                    className="form-control"
                    onChange={handleChange("courseDept")}
                    type="text"
                    value={courseDept}
                />
            </div>
            <div className="form-group">
                <label className="text-light">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-light">Course Room</label>
                <input
                    className="form-control"
                    onChange={handleChange("room")}
                    type="text"
                    value={room}
                />
            </div>
            <div className="form-group">
                <label className="text-light">waitlistCapacity</label>
                <input
                    className="form-control"
                    onChange={handleChange("waitlistCapacity")}
                    type="text"
                    value={waitlistCapacity}
                />
            </div>
            <div className="form-group">
                <label className="text-light">courseTeam</label>
                <input
                    className="form-control"
                    onChange={handleChange("courseTeam")}
                    type="text"
                    value={courseTeam}
                />
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                Create Course
      </button>
        </form>
    );

    return (
        <Base
            title="Add a Course here!"
            description="Welcome to Course creation section"
            className="container bg-info p-4"
        >
            <Link to="/dashboard" className="btn btn-md btn-dark mb-3">
                Faculty Home
      </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {createCourseForm()}
                </div>
            </div>
        </Base>
    );
};

export default AddCourse;
