import { createSlice } from '@reduxjs/toolkit'
import {nanoid} from "nanoid";

export const formElements = createSlice({
    name: 'formElements',
    initialState: {
        currentJob: {
          jobName: "",
          jobPriority: ""
        },
        jobList: [],
        priority: []
    },
    reducers: {
        updatePriorityList(state, action) {
            state.priority = action.payload
        },
        editCurrentJob: (state, action) => {
            state.currentJob[action.payload.field] = action.payload.value
        },
        updateJobList: (state, action) => {
            state.jobList = action.payload
        },
        addJobToList: (state, action) => {
            state.jobList.push({...action.payload, id: nanoid()})
            localStorage.setItem('jobList', JSON.stringify(state.jobList))
        },
        editSelectedJob: (state, action) => {
            const newJobList = state.jobList.map(job => {
                if (state.jobList.indexOf(job) === action.payload.index) {
                    return action.payload.value
                }
                return {
                    jobName: job.jobName,
                    jobPriority: job.jobPriority
                }
            })
            Object.assign(state.jobList, newJobList)

            localStorage.setItem('jobList', JSON.stringify(state.jobList))
        },
        removeJob: (state, action) => {
            const id = state.jobList.findIndex(x => x.id === action.payload)
            state.jobList.splice(id, 1)
            localStorage.setItem('jobList', JSON.stringify(state.jobList))
        }
    }
})

export const {
    editCurrentJob,
    updateJobList,
    removeJob,
    editSelectedJob,
    addJobToList,
    updatePriorityList
    } = formElements.actions

export default formElements.reducer