import { configureStore } from '@reduxjs/toolkit'
import formElements from './modules/formElements'

export default configureStore({
    reducer: {
        formElements: formElements
    }
})