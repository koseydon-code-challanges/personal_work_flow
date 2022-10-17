import React from "react";
import PropTypes from 'prop-types'

function SelectComponent(props) {
    return (
        <div className="w-full">
            {
                props.label &&
                <label className="text-sm font-medium text-gray-900 block mb-2">
                    {props.label}
                </label>
            }
            <select
                defaultValue={props.defaultValue}
                key={props.defaultValue}
                onChange={(event) => {props.change(event.target.value)}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">{props.placeholder}</option>
                {props.options.map(option => {
                    return (
                        <option key={props.options.indexOf(option)} value={option}>
                            {option}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

SelectComponent.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array
}

SelectComponent.defaultProps = {
    label: '',
    placeholder: 'Placeholder',
    options: []
};

export default SelectComponent