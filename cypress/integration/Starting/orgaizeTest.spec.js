//how to organize test
//cypress references vStudio identifies cypress
<reference types="cypress"/>

describe ('Our first suite', () => {
    beforeEach ('code for every test', () => {
        //repetitive code this is going to repeat this following test
    })
    describe('our suite section', () =>{
        beforeEach ('code for every test', () => {
            //repetitive code this is going to repeat this following test
        })
        it ('first section test', () => {

        })

    })
    it ('first test', () => {

    })

    it ('second test', () => {

    })

    it ('thirth test', () => {

    })

})

describe ('Our second suite', () => {
    beforeEach ('code for every test', () => {
        //repetitive code this is going to repeat this following tests
        //without to repeat in each test 1,2, or 3
   
    })
    it ('first test', () => {

    })

    it ('second test', () => {

    })

    it ('thirth test', () => {

    })

})