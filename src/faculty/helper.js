import { API } from "../backend";




//create a couser
export const CreateCourse = (userId, token, course) => {

    return fetch(`${API}/addCourse/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(course)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    // return fetch(`${API}/addCourse/${userId}`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify(course)
    // })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .catch(err => console.log(err));
};

//get all course
export const getCourses = () => {
    return fetch(`${API}/getAllCourse`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//delete a course

export const deleteCourse = (courseId, userId, token) => {
    return fetch(`${API}/course/${courseId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


