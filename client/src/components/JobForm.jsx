import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import InputComponent from "./FormComponents/InputComponent.jsx";
import SelectComponent from "./FormComponents/SelectComponent.jsx";
import ButtonComponent from "./FormComponents/ButtonComponent.jsx";

import { addJobToList } from '../store/modules/formElements'

import {PlusIcon} from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as yup from 'yup';

export default function JobForm() {
    const priority = useSelector(state => state.formElements.priority)
    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        jobName: yup.string().required('Job Name is required').max(255, 'Maximum characters exceeded ').matches(/^[\w\-\s]+$/ , 'Is not in correct format'),
        jobPriority: yup.string().required('Job Priority is required'),
    });

    const formik = useFormik({
        initialValues: {
            jobName: "",
            jobPriority: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        onSubmit: (data,{ resetForm }) => {
            dispatch(addJobToList(data))
            resetForm()
        },

    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="py-5 font-bold text-lg">
                Create New Job
            </div>
            <div className="flex w-full grid grid-cols-9 gap-3">
                <div className="col-span-9 lg:col-span-6">
                    <InputComponent
                        label="jobName"
                        name="jobName"
                        placeholder={"Please enter the job"}
                        input={(value) => formik.setFieldValue("jobName", value) }
                        defaultValue={formik.values.jobName}/>
                        <div className="text-red-500">
                            {formik.errors.jobName ? formik.errors.jobName : null}
                        </div>
                </div>
                <div className="col-span-9 lg:col-span-2">
                    <SelectComponent
                        label="Job Priority"
                        name="jobPriority"
                        placeholder="Select a priority"
                        options={priority}
                        defaultValue={formik.values.jobPriority}
                        change={(value) => formik.setFieldValue('jobPriority', value)}
                    />
                    <div className="text-red-500">
                        {formik.errors.jobPriority ? formik.errors.jobPriority : null}
                    </div>
                </div>
                <div className="col-span-9 lg:col-span-1">
                    <label className="hidden lg:block text-sm font-medium text-gray-900 block mb-2">
                        &nbsp;
                    </label>
                    <ButtonComponent>
                        <PlusIcon className="h-5 w-5 text-white mr-1" />
                        <span>Create</span>
                    </ButtonComponent>
                </div>
            </div>
        </form>
    )
}