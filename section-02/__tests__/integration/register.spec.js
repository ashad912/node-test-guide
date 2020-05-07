/**
 * @jest-environment node
 */

import server from '@server/app'
import supertest from 'supertest'
import {disconnect} from '@tests/utils/mongoose'

import User from '@models/User'

const app = () => supertest(server)

describe('The register process', () => {

    const REGISTER_ENDPOINT = '/api/v1/auth/register'

    let user = {
        name: 'Test User',
        email: 'test@user.com',
        password: 'password'
    }

    beforeEach(async () => {
        await User.deleteMany({})
    })

    it('should register a new user', async () => {
        const res = await app().post(REGISTER_ENDPOINT).send(user)

        expect(res.status).toBe(200)
        expect(res.body.data.token).toBeDefined()
        expect(res.body.message).toBe('Account registered.')
    })

    it('should return a 422 if registration fails', async () => {
        //prepare
        await User.create(user)

        //action
        const res = await app().post(REGISTER_ENDPOINT).send(user)

        //assertion
        expect(res.status).toBe(422)
        expect(res.body.message).toBe('Validation failed.')
        expect(res.body.data.errors).toEqual({
            email: 'This email has already been taken.'
        })

        
    })

    afterAll(async () => {
        await disconnect()
    })
})

