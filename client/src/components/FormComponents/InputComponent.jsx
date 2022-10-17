import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {nanoid} from "nanoid";
import {updateJobList} from "../../store/modules/formElements";

function InputComponent(props) {


    return (
        <div className="w-full">
            {
                props.label &&
                <label className="text-sm font-medium text-gray-900 block mb-2">
                    { props.label }
                </label>
            }
            <input type="text"
                   placeholder={props.placeholder}
                   name={props.name}
                   className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${props.disabled && 'cursor-not-allowed'}`}
                   value={props.defaultValue}
                   disabled={props.disabled}
                   onChange={(event) => props.input && props.input(event.target.value)} />
        </div>
    )
}

InputComponent.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string
}

InputComponent.defaultProps = {
    label: '',
    name: '',
    placeholder: 'Placeholder',
    disabled: false
};

export default InputComponent