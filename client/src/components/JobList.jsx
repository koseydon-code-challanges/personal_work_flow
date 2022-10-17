import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Job from "./Job.jsx";
import InputComponent from "./FormComponents/InputComponent.jsx";
import SelectComponent from "./FormComponents/SelectComponent.jsx";
import orderBy from 'lodash/orderBy';
import {ArrowDownIcon, ArrowUpIcon, SwitchVerticalIcon} from "@heroicons/react/solid";

export default function Form() {
    const jobList = useSelector(state => state.formElements.jobList)
    const priority = useSelector(state => state.formElements.priority)

    const [jobNameFilter, setJobNameFilter] = useState("")
    const [jobPriorityFilter, setJobPriorityFilter] = useState("")
    const [updatedJobList, setUpdatedJobList] = useState([])
    const [sortDirection, setSortDirection] = useState('asc')
    const [sortItem, setSortItem] = useState('')

    useEffect(() => {
        setUpdatedJobList(jobList)
    }, [jobList]);

    const sortJobListByName = (name) => {
        const tempArr = orderBy(jobList, name, sortDirection)
        setSortItem(name)
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        setUpdatedJobList(tempArr)
    }

    return (
        <>
            <div className="py-5 font-bold text-lg">
                Job List
            </div>
            <div className={`border ${jobList.length && 'divide-y'}`}>
                <div className="grid grid-cols-3 gap-3 p-3">
                    <div className="col-span-3 lg:col-span-2 flex items-center">
                        <InputComponent
                            placeholder={"Please enter the job"}
                            input={(value) => {
                                setJobNameFilter(value)
                            }}/>
                    </div>
                    <div className="col-span-3 lg:col-span-1 flex items-center">
                        <SelectComponent
                            placeholder="Priority (All)"
                            options={priority}
                            change={(value) => {
                                setJobPriorityFilter(value)
                            }}
                        />
                    </div>
                </div>
                {
                    jobList.length ?
                        <>
                            <div className="bg-indigo-200">
                                <div className="p-3 flex justify-between sm:grid grid-cols-8 lg:grid-cols-9 gap-3 font-semibold">
                                    <div className="flex items-center col-span-4 lg:col-span-6 p-2.5" onClick={() => sortJobListByName('jobName')}>
                                        Name
                                        {(sortItem !== 'jobName') && <SwitchVerticalIcon className="w-5 h-5"/>}
                                        {(sortItem === 'jobName' && sortDirection === 'desc') && <ArrowDownIcon className="w-3 h-3"/>}
                                        {(sortItem === 'jobName' && sortDirection === 'asc') && <ArrowUpIcon className="w-3 h-3"/>}
                                    </div>
                                    <div className="flex items-center col-span-2 p-2.5" onClick={() => sortJobListByName('jobPriority')}>
                                        Priority
                                        {(sortItem !== 'jobPriority') && <SwitchVerticalIcon className="w-5 h-5"/>}
                                        {(sortItem === 'jobPriority' && sortDirection === 'desc') && <ArrowDownIcon className="w-3 h-3"/>}
                                        {(sortItem === 'jobPriority' && sortDirection === 'asc') && <ArrowUpIcon className="w-3 h-3"/>}
                                    </div>
                                    <div className="hidden sm:block col-span-2 lg:col-span-1 p-2.5">
                                        Actions
                                    </div>
                                </div>
                            </div>
                            {updatedJobList.filter(job => job.jobName.includes(jobNameFilter) && job.jobPriority.includes(jobPriorityFilter)).map((job, i) => {
                                return (
                                    <Job item={job} index={i} key={i}/>
                                )
                            })}
                        </>
                        :
                        <></>
                }
            </div>
        </>
    )
}