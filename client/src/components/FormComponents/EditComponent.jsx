import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types'
import InputComponent from "./InputComponent.jsx";
import ButtonComponent from "./ButtonComponent.jsx";
import {editSelectedJob} from "../../store/modules/formElements";

import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import SelectComponent from "./SelectComponent.jsx";
import {useDispatch, useSelector} from "react-redux";

function EditComponent(props) {
    const ReactSwal = withReactContent(Swal)

    const dispatch = useDispatch()

    const priority = useSelector(state => state.formElements.priority)
    const [tempJob, setTempJob] = useState({
        jobName: '',
        jobPriority: ''
    });

    useEffect(() => {
        setTempJob(props.item)
    }, [props.item])

    const handleEditJob = () => {
        ReactSwal.fire({
            title: 'Job Edit',
            showCancelButton: true,
            confirmButtonColor: '#e83d6d',
            cancelButtonColor: '#e8e8e8',
            html:
                <div className="flex">
                    <InputComponent
                        label="Job Name"
                        placeholder={"Please enter the job"}
                        defaultValue={tempJob.jobName}
                        input={(value) => {
                            setTempJob(prevState => ({
                                ...prevState,
                                jobName: value
                            }))
                        }}
                    />
                    <SelectComponent
                        label="Job Priority"
                        placeholder="Priority"
                        options={priority}
                        defaultValue={tempJob.jobPriority}
                        change={(value) => {
                            setTempJob(prevState => ({
                                ...prevState,
                                jobPriority: value
                            }))
                        }}
                    />
                </div>,
            confirmButtonText: 'Approve'
        }).then((result) => {

            if (result.isConfirmed) {
                console.log(tempJob)
                dispatch(editSelectedJob({
                    index: props.index,
                    value: tempJob
                }))
            }
        })
    }


    return (
        <div>
            <ButtonComponent onClick={() => {handleEditJob()}}>
            <span>
                edit
            </span>
            </ButtonComponent>
        </div>
    )
}

EditComponent.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string
}

EditComponent.defaultProps = {
    label: 'Input',
    placeholder: 'Placeholder'
};

export default EditComponent