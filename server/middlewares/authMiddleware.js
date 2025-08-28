import { clerkClient } from "@clerk/express";

//middleware to protect educator route
export const protectEducator = async(req, res, next)=> {
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata.role !== 'educator'){
            return res.json({sucess: false, message: 'Unauthorised access'})
        }

        next()
    } catch (error) {
        res.json({sucess: false, message: error.message})
    }
}