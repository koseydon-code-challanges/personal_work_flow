import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import {editSelectedJob} from '../../store/modules/formElements'

import ButtonComponent from "../FormComponents/ButtonComponent.jsx";
import InputComponent from "../FormComponents/InputComponent.jsx";
import SelectComponent from "../FormComponents/SelectComponent.jsx";
import PopupWrapper from "../PopupWrapper.jsx";

const EditButton = forwardRef((props, ref) => {
    const priority = useSelector(state => state.formElements.priority)
    const popupRef = useRef(null);

    useImperativeHandle(ref, () => ({
        openModal() {
            openModal()
        },
        closeModal() {
            closeModal()
        },
    }));

    function closeModal() {
        popupRef.current.closeModal()
    }

    function openModal() {
        popupRef.current.openModal()
    }

    const dispatch = useDispatch()

    const [tempJob, setTempJob] = useState({
        jobName: '',
        jobPriority: ''
    })

    useEffect(() => {
        setTempJob(prevState => ({...prevState, ...props.item}))
    }, [props.item])

    const handleEditJob = () => {
        dispatch(editSelectedJob({
            index: props.index,
            value: tempJob
        }))
        popupRef.current.closeModal()
    }

    return (
        <>
            <PopupWrapper ref={popupRef}>
                <div className="space-y-5">
                    <div className="flex justify-center font-semibold text-lg">
                        Job Edit
                    </div>
                    <InputComponent
                        label="Job Name"
                        placeholder={"Please enter the job"}
                        disabled={true}
                        defaultValue={props.item.jobName}
                        input={(value) => {
                            setTempJob(Object.assign(tempJob, {jobName: value}))
                        }}/>
                    <SelectComponent
                        label="Job Priority"
                        placeholder="Priority"
                        options={priority}
                        defaultValue={props.item.jobPriority}
                        change={(value) => {
                            setTempJob(Object.assign(tempJob, {jobPriority: value}))
                        }}
                    />
                    <div className="w-full flex items-center justify-evenly">
                        <ButtonComponent
                            class="!w-40 !bg-gray-200 !text-gray-500"
                            onClick={() => popupRef.current.closeModal()}>
                        <span>
                            Cancel
                        </span>
                        </ButtonComponent>
                        <ButtonComponent
                            class="!w-40 !bg-red-500"
                            onClick={() => handleEditJob(props.item.id)}>
                        <span>
                            Approve
                        </span>
                        </ButtonComponent>
                    </div>
                </div>
            </PopupWrapper>
        </>
    )
})

export default EditButton