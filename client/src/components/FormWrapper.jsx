import React from "react";
import JobList from "./JobList.jsx";
import JobForm from "./JobForm.jsx";

export default function FormWrapper() {

    return (
        <div className="py-10 px-5 lg:px-20">
            <div className="border-b">
                Logo
            </div>
            <JobForm />
            <JobList />
        </div>
    )
}