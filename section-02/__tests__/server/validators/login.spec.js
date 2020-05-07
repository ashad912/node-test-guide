/**
 * @jest-enviroment node
 */

import loginValidator from '@validators/login'
import Response from '@tests/utils/response'

describe('The login validator', () => {
    it('should call the next function when validations succeeds', async () => {
        const req = {
            body: {
                email: 'a@b.com',
                password: 'password'
            }
        }

        const res = {}
        const next = jest.fn() //monitor if func was called, how many times

        await loginValidator(req, res, next)

        //we need expect calling next func

        expect(next).toHaveBeenCalled()
    })

    it('should return a 422 if validation fails', async () => {
        const req = {
            body: {
                password: 'password'
            }
        }

        const next = jest.fn()

        const res = new Response()

        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')

        await loginValidator(req, res, next)

        expect(statusSpy).toHaveBeenCalledWith(422)
        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Validation failed.',
            data: {
                errors: {
                    'email': 'email is a required field'
                }
            }
        })
    })
})