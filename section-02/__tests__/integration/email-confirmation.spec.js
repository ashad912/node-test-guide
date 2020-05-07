/**
 * @jest-environment node
 */

import server from '@server/app'
import supertest from 'supertest'
import {disconnect} from '@tests/utils/mongoose'

import User from '@models/User'

const app = () => supertest(server)

describe('The register process', () => {

    const EMAIL_CONFIRM_ENDPOINT = '/api/v1/auth/emails/confirm'

    let user = {
        name: 'Test User',
        email: 'test@user.com',
        password: 'password'
    }

    beforeEach(async () => {
        await User.deleteMany({})
    })

    it('confirms a user email', async () => {
        const createdUser = await User.create(user)

        const res = await app().post(EMAIL_CONFIRM_ENDPOINT).send({token: createdUser.emailConfirmCode})

        expect(res.status).toBe(200)
        expect(res.body.data.user.emailConfirmCode).toBeNull()
        expect(res.body.data.user.emailConfirmedAt).toBeDefined()

        //test if db updated, not only response!!
        const freshUser = await User.findOne({email: createdUser.email})

        expect(freshUser.emailConfirmCode).toBeNull()
        expect(freshUser.emailConfirmedAt).toBeDefined()
    })

    if('returns a 422 if token is invalid', async () => {
        const res = await app().post(EMAIL_CONFIRM_ENDPOINT).send({token: 'xxx'})

        expect(res.status).toBe(422)
        expect(res.body.message).toBe('Validation failed.')
    })
   

    afterAll(async () => {
        await disconnect()
    })
})

