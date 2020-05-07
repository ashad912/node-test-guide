/**
 * @jest-environment node
 */

import User from '@models/User' 

import authMiddleware from '@middleware/auth'
import Response from '@tests/utils/response'

import {connect, disconnect} from '@tests/utils/mongoose'



describe("The auth middleware", () => {


    const user = {
        name: 'Test User',
        email: 'test@user.com',
        password: 'password'
    }

    let createdUser

    //setup connection before all test cases in describe

    beforeAll(async () => {
        //await mongoose.connect('mongodb://localhost:27017/auth-app_test', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
        await connect() //connect return promise witch is resolved here
        createdUser = await User.create(user)
    })

    it('should call the next function if authentication is successful', async () => {
        const accessToken = createdUser.generateToken()

        const req = {
            body: {
                access_token: accessToken
            }
        }

        const res = new Response()
        const next = jest.fn()

        await authMiddleware(req, res, next)

        expect(next).toHaveBeenCalled()
    })
  
    it('should return a 401 if authentication fails', async () => {
        const req = {
            body: {}
        }
        const res = new Response()

        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')

        const next = jest.fn()

        await authMiddleware(req, res, next)

        expect(next).toHaveBeenCalledTimes(0)
        expect(statusSpy).toHaveBeenCalledWith(401)
        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Unauthenticated.'
        })
    })

    //close after all cases
    afterAll(async () => {
        await disconnect()
    })
})
