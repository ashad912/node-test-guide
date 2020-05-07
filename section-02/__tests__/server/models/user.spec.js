/**
 * @jest-environment node
 */
import User from '@models/User' //@ go to the root from .bablelrc -> "@": "./",

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@config'


import {connect, disconnect} from '@tests/utils/mongoose'

//beforeEach() //before any test
//beforeAll() //before all tests


describe("The User model", () => {


    const user = {
        name: 'Test User',
        email: 'test@user.com',
        password: 'password'
    }

    let createdUser

    //setup connection before all test cases in describe

    beforeAll(async () => {
        await connect()
        createdUser = await User.create(user)
    })

    it('should hash the user password before saving to the db', async () => {
        
        //we want to mock email sending (post save middleware)
        //need to build mock class with all used methods!
        expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(true)


        //close connection after test
        // await mongoose.connection.close()
    })

    it('should set the email confirm code for the user before saving to the db', async () => {
        

        //toBeDefined - no type checking
        expect(createdUser.emailConfirmCode).toEqual(expect.any(String))
    })

    describe('The generateToken method', () => {
        it('should generate a valid jwt for a user', () => {
            const token = createdUser.generateToken()
            const {id} = jwt.verify(token, config.jwtSecret)

            expect(id).toEqual(createdUser._id.toString())
        })
    })

    //close after all cases
    afterAll(async () => {
        await disconnect()
    })
})
