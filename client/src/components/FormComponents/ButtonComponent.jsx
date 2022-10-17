import React from "react";
import PropTypes from 'prop-types'

function ButtonComponent(props) {
    return (
        <div>
            <button
                type="submit"
                onClick={(event) => props.onClick && props.onClick()}
                className={`px-4 h-[43px] bg-indigo-500 justify-center items-center inline-flex text-white rounded-sm min-w-36 ${props.class}`}>
                {props.children}
            </button>
        </div>
    )
}

ButtonComponent.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string
}

ButtonComponent.defaultProps = {
    label: 'Input',
    placeholder: 'Placeholder'
};

export default ButtonComponent