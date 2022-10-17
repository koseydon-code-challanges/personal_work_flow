import React, { useEffect} from "react";
import { useDispatch } from 'react-redux'
import { updateJobList, updatePriorityList } from '../store/modules/formElements'
import FormWrapper from "./FormWrapper.jsx";


export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const priorityList = async () => {
            const response = await fetch('http://localhost:3000/getPriorityList')
            if (response.ok) {
                const tempPriorityList = await response.json()
                dispatch(updatePriorityList(tempPriorityList))
            }
        };

        priorityList()

        const jobList = JSON.parse(localStorage.getItem('jobList'))
        if(jobList && jobList.length) {
            dispatch(updateJobList(jobList))
        }
    });
    return (
        <FormWrapper />
    )
}