import { useEffect, useState } from 'react'

const useValidate = (naam) => {
    const [error, setError] = useState({})

    const manageError = (name, status, msg = "") => {
        status ? setError((prev) => ({ ...prev, [name]: { status: true, message: msg } }))
            : setError((prev) => ({ ...prev, [name]: { status: false, message: msg } }))
    }

    const validateInputs = (name, value, type) => {

        if (type === "text") {
            if (value.trim() && value.length >= 2) {
                const msg = "enter a valid name"
                const pattern = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/
                pattern.test(value) ? manageError(name, false) : manageError(name, true, msg)
            }
            else {
                const msg = "name is too short"
                manageError(name, true, msg)
            }
        }
        if (type === "email") {
            const msg = "enter valid email"
            const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            pattern.test(value) ? manageError(name, false) : manageError(name, true, msg)
        }
        else if (type === "password") {
            const msg = "Enter a valid password"
            const pattern = /[a-zA-Z0-9]{6,30}/
            pattern.test(value) ? manageError(name, false) : manageError(name, true, msg)
        }
        else if (name === "role") {
            const msg = "please select a user"
            value ? manageError(name, false) : manageError(name, true, msg)
        }

    }

    const checkValidations = (fieldsToCheck) => {
        console.log("fieldsToCheck", fieldsToCheck)

        fieldsToCheck.forEach(({ name }) => {
            let msg = "Please fill this field"
            if (!naam[name]) {
                manageError(name, true, msg)
            }
        })
    }

    return { error, validateInputs, manageError, checkValidations }
}

export default useValidate


// else {
//     let hasErrors = false
//     Object.keys(error).forEach((cur) => {
//         hasErrors = Object.keys(cur).some((curVal) => curVal.status)
//     })

// console.log("hasErrors", hasErrors)

//     if (!hasErrors) {
//         manageError(name, false)
//     }
//     else{
//         manageError(name, true)
//     }
// }

// error in all field validation like it checks if all fields are empty or not then if user fills invalid credentials then it fails to check problem root checkvalidations function