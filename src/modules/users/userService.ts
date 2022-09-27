import { clientError } from "../../utils/error"
import {
    hashPassword, comparePassword, generateToken
} from "../../utils/helpers"

import {
    createUser,
    findUser
} from "./usersRepository"
import {
    createUserValidator, loginUserValidator
} from "./uservalidation"

export async function createUserService(payload: {[key: string]: any}) {
    try {
        const {
            username, email,
            password, phoneNo,
            address: {
                country,
                state,
                localGovt,
                postalcode
            }
        } = createUserValidator(payload)

        await createUser(
            {
                username, email,
                password: hashPassword(password), 
                phoneNo,
                status: "active",
                address: {
                    country,
                    state,
                    localGovt,
                    postalcode
                }
            }
        )
        return "user sign up successfully"
        
    } catch (err) {
        return err
    }
}

export async function loginUserService (payload: {[key: string]: any}) {
    try{
        const {email, password} = loginUserValidator(payload)
        let User = await findUser({email})

        if (!User || !comparePassword(password, User.password) ) {
            throw new clientError("invalid email or password", 400)
        }

        const token = generateToken({id: User._id})
        return {
            accessToken : token,
            User
        }
    } catch (err) {
        return err
    }
}
//forgot password
//reset password
//change password
//resend password verification code
//online offline status of user using socket.io
//create post
//get profile