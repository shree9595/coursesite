import React, { useState, useEffect } from "react";
// import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getCourses } from "../faculty/helper";


export default function Home() {
    const [Course, setCourse] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        return getCourses().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCourse(data);
            }
        });
    };

    useEffect(() => {
        loadAllProduct();
    }, []);
  

    return (
        <Base title="Course Page" description="Welcome">
            <div className="row text-center">
                <h1 className="text-white center">All Course</h1>
                <div className="row">
                    {Course.map((course, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card course={course} />

                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
}
