import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../helper/index";
import { Link } from "react-router-dom";

const DashBoard = () => {
    const {
        user: { name, email, role }
    } = isAutheticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Faculty Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/createcourse" className=" nav-link text-success">
                            Create Course
            </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/facultyCourse" className="nav-link text-success">
                            My Course
            </Link>
                    </li>


                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {email}
                    </li>

                    <li className="list-group-item">
                        <span className="badge badge-danger">Faculty Area</span>
                    </li>
                </ul>
            </div>
        );
    };
    return (
        <Base
            title="Welcome to Faculty area"
            description="Manage all of your Course here"
            className="container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
        </Base>
    );
};

export default DashBoard;
