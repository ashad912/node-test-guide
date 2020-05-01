const { findUserByEmail, findUserById } = require('../users')

//in scripts: nyc mocha -> shows test files coverage 
//done callback can be set after script "mocha timeout ..."
//mocha with assert
//jest with expect

//test runner: mocha, jest
//coverage: nyc, jest --coverage
//assertion: assert, expect

describe('The findUserByEmail function' , () => {
    it('finds a user by email', done => { //done for async functions, withour async/await
        findUserByEmail('bahdcoder@gmail.com').then(response => {
            expect(response.message).toEqual('User found successfully.')

            done()
        })
    })

    it('finds a user by email (Using the return promise method)', () => {
        //returning a promise - no need to use done
        return findUserByEmail('bahdcoder@gmail.com').then(response => {
            expect(response.message).toBe('User found successfully.')
        })
    })

    it('finds a user by email (Using async/await)', async () => {
        const response = await findUserByEmail('bahdcoder@gmail.com')

        expect(response.message).toBe('User found successfully.')
    })

    it('rejects with error if user with email was not found.', () => {
        const actual = findUserByEmail('x@y.com')

        expect(actual).rejects.toEqual(new Error('User with email: x@y.com was not found.'))
    })
    // MOCHA
    // it('rejects with error if user with email was not found.', () => {
    //     return findUserByEmail('x@y.com').then(() => {
    //            assert.fail('Expected findUserByEmail func to reject')
    //     }, error => { // short catch?
    //            assert.equal(error.message, 'User with email: x@y.com was not found')
    //     })
    // })
})

describe('The findUserById function', () => {
    it('should find a user by id', async () => {
        const response = await findUserById(1)

        expect(response.message).toBe('User found successfully.')
    })
    // lack of coverage?
    // it('should reject if user is not found by id', () => {
    //     const actual = findUserById(90)

    //     expect(actual).rejects.toEqual(new Error('User with id: 90 was not found.'))
    // })

    //full coverage
    it('should reject if user is not found by id', async () => {
        const actual = findUserById(90)

        await expect(actual).rejects.toEqual(new Error('User with id: 90 was not found.'))
    })

    //full coverage
    // it('should reject if user is not found by id', async () => {
    //     try{
    //         await findUserById(90)
    //     }catch(e){
    //         expect(e).toEqual(new Error('User with id: 90 was not found.'))
    //     }        
    // })
})
