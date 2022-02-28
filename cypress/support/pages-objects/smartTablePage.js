
export class SmartTable{

    updateAgeByFirstName(name, age){

     cy.get('tbody').contains('tr', name).then ( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click() 
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)          
        cy.wrap(tableRow).find('.nb-checkmark').click() //encuetra el check y hazle click para salvar cambios
        cy.wrap(tableRow).find('td').should('contain',age) //encuentra la columna que deberia tener 25

     })
    }

    addNewRecordWithFirstAndLastName(firstName, lastName){
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get ('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain',firstName)
            cy.wrap(tableColumns).eq(3).should('contain',lastName)

        })

    }

    deleteRowByIndex(index){
         const stub = cy.stub() //moqs and stub functions created
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(()=> {
           expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')//when we get our function stub, expect callwith our assertion mesaage
           //stub will be empty when the event do not ocurr.
        })




    }

}

export const onSmartTablePage = new SmartTable()