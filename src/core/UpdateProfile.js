import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../helper/index";
import { getRegister } from "./registerHelper";
import { isAutheticated, updateUser } from "../helper/index";

const Signup = () => {
    const { user, token } = isAutheticated();

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",

        role: 0,
        contact: "",
        aboutME: "",
        city: "",
        country: "",
        company: "",
        school: "",
        hometown: "",
        waitlist: "",
        courseTeam: "",
        error: "",
        success: false
    });

    const { name, email, password, role, contact, aboutME,

        city,
        country,
        company,
        school,
        courseTeam,
        hometown,
        waitlist,
        error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const preload = () => {
        return getRegister(user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setValues({
                    ...values,
                    name: data[0].name,
                    email: data[0].email,
                    contact: data[0].contact,
                    aboutME: data[0].aboutME,
                    city: data[0].city,
                    country: data[0].country,
                    company: data[0].company,
                    school: data[0].school,
                    hometown: data[0].hometown,
                    waitlist: data[0].waitlist,
                    courseTeam: data[0].courseTeam,

                    error: "",

                });
            }
        });
    };

    useEffect(() => {
        preload()
    }, [])

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        updateUser(user._id, token, {
            name, email, password, role, contact, aboutME,

            city,
            country,
            company,
            school,
            courseTeam,
            hometown,
            waitlist,
        })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        select: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(console.log("Error in signup"));
    };

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
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
                            <label className="text-light">Email</label>
                            <input
                                className="form-control"
                                onChange={handleChange("email")}
                                type="email"
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">contact</label>
                            <input
                                className="form-control"
                                onChange={handleChange("contact")}
                                type="text"
                                value={contact}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">aboutME</label>
                            <input
                                className="form-control"
                                onChange={handleChange("aboutME")}
                                type="text"
                                value={aboutME}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">city</label>
                            <input
                                className="form-control"
                                onChange={handleChange("city")}
                                type="text"
                                value={city}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">city</label>
                            <input
                                className="form-control"
                                onChange={handleChange("city")}
                                type="text"
                                value={city}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">country</label>
                            <input
                                className="form-control"
                                onChange={handleChange("country")}
                                type="text"
                                value={country}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">company</label>
                            <input
                                className="form-control"
                                onChange={handleChange("company")}
                                type="text"
                                value={company}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">school</label>
                            <input
                                className="form-control"
                                onChange={handleChange("school")}
                                type="text"
                                value={school}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">hometown</label>
                            <input
                                className="form-control"
                                onChange={handleChange("hometown")}
                                type="text"
                                value={hometown}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">waitlist</label>
                            <input
                                className="form-control"
                                onChange={handleChange("waitlist")}
                                type="text"
                                value={waitlist}
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




                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
            </button>
                    </form>
                </div>
            </div>
        );
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                         Profile update successfully.
            
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Base title="Profile Update page" description="A page for user to update Profile">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
          
        </Base>
    );
};

export default Signup;
