import React, { useRef } from 'react';

import ButtonComponent from "./FormComponents/ButtonComponent.jsx";
import EditButton from "./ActionButtons/EditButton.jsx";
import RemoveButton from "./ActionButtons/RemoveButtons.jsx";
import {PencilAltIcon, TrashIcon} from "@heroicons/react/solid";

export default function Job(props) {
    const editRef = useRef(null);
    const removeRef = useRef(null);

    function getPriorityColor(priority){
        switch (priority) {
            case 'Urgent':
                return "bg-red-400"
            case 'Regular':
                return "bg-orange-400"
            case 'Trivial':
                return "bg-blue-400"
        }
    }

    return (
        <div className="p-3 p-3 grid grid-cols-8 lg:grid-cols-9 gap-3">
            <div className="flex items-center justify-between col-span-8 sm:col-span-4 lg:col-span-6 p-2.5">
                <span className="flex sm:hidden">
                    Name:
                </span>
                <span>
                    {props.item.jobName}
                </span>
            </div>
            <div className="flex items-center justify-between col-span-8 sm:col-span-2 p-2.5">
                <span className="flex sm:hidden">
                    Priority:
                </span>
                <div className={`rounded px-2 py-1 text-white font-semibold ${getPriorityColor(props.item.jobPriority)}`}>
                    {props.item.jobPriority}
                </div>
            </div>
            <div className="flex justify-end sm:justify-start col-span-8 sm:col-span-2 lg:col-span-1 p-2.5 flex space-x-3">
                <ButtonComponent
                    class="!bg-gray-300"
                    onClick={() => editRef.current.openModal()}>
                    <span>
                        <PencilAltIcon className="h-5 w-5 text-gray-500" />
                    </span>
                </ButtonComponent>
                <ButtonComponent
                    class="!bg-gray-300"
                    onClick={() => removeRef.current.openModal()}>
                    <span>
                        <TrashIcon className="h-5 w-5 text-gray-500" />
                    </span>
                </ButtonComponent>
            </div>
            <EditButton ref={editRef} item={props.item} index={props.index}/>
            <RemoveButton ref={removeRef} item={props.item} index={props.index}/>
        </div>
    )
}