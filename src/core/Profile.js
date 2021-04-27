import React from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";



function UserDashBoard() {

    const RightSide = () => {
        return (
            <div className="card fixed" >
                <h4 className="card-header bg-dark text-white fixed">Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item fixed">
                        <Link to="/UpdateProfile" className="nav-link text-success ">
                            Updated Profile
            </Link>
                    </li>
                    <li className="list-group-item fixed">
                        <Link to="/MyCourses" className="nav-link text-success ">
                            My Register Course
            </Link>
                    </li>


                </ul>
            </div>

        )

    }
    const LeftSide = () => {
        return (
            <h3>Profile Section </h3>
        )

    }


    return (
        <Base>
            <div className="text-center">{RightSide()}</div>



        </Base>
    );
}

export default UserDashBoard;
