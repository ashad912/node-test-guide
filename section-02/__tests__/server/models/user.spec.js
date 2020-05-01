/**
 * @jest-environment node
 */
import User from '@models/User' //@ go to the root from .bablelrc -> "@": "./",
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

describe("The User model", () => {
    it('should hash the user password before saving to the db', async () => {
        await mongoose.connect('mongodb://localhost:27017/auth-app_test', {useNewUrlParser: true})

        const user = {
            name: 'Test User',
            email: 'test@user.com',
            password: 'password'
        }

        const createdUser = await User.create(user)

        //we want to mock email sending (post save middleware)
        //need to build mock class with all used methods!
        expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(true)


        //close connection after test
        await mongoose.connection.close()
    })
})
