import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import { useDispatch} from 'react-redux'

import { removeJob } from '../../store/modules/formElements'

import ButtonComponent from "../FormComponents/ButtonComponent.jsx";
import PopupWrapper from "../PopupWrapper.jsx";
import {ExclamationCircleIcon} from "@heroicons/react/solid";

const RemoveButton = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        openModal() {
            openModal()
        },
        closeModal() {
            closeModal()
        },
    }));

    const popupRef = useRef(null);

    const dispatch = useDispatch()

    const handleRemoveJob = (id) => {
        dispatch(removeJob(id))
        popupRef.current.closeModal()
    }

    function closeModal() {
        popupRef.current.closeModal()
    }

    function openModal() {
        popupRef.current.openModal()
    }

    return (
        <>
            <PopupWrapper ref={popupRef}>
                <div className="w-full flex items-center justify-center">
                    <ExclamationCircleIcon className="w-20 h-20 text-red-500" />
                </div>
                <div className="w-full flex items-center justify-center font-semibold text-lg my-2">
                    Are You Sure you want to delete it?
                </div>
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
                        onClick={() => handleRemoveJob(props.item.id)}>
                        <span>
                            Approve
                        </span>
                    </ButtonComponent>
                </div>
            </PopupWrapper>
        </>
    )
})

export default RemoveButton