/// <reference types="cypress"/>

const { createYield } = require("typescript")

describe('Test suite 5', () => {

    it('Tooltip test', () =>{ //ademas de poder usar click en tooltip tambien se puede usar over the mouse method
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
        cy.get('nb-layout-header nb-icon').find('[data-name="menu-2"]').click()   //contraer el menu

        cy.contains('nb-card','Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain','This is a tooltip')

    })

    it.only('dialog box and windows broser dialog', () =>{

        //we will start with the dialog browser of delete row from table
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('nb-layout-header nb-icon').find('[data-name="menu-2"]').click() 

        cy.get('tbody tr').first().find('.nb-trash').click()

        //1.0 en este ejemplo no podemos aseverar que esta correcto por que en caso de no activarse la ventana
        //cypress lo vera siempre como una confirmacion asi se muestre o no el mensaje"NUNCA FALLARA"
       // cy.on('window:confirm',(confirm) => { 
        //    expect(confirm).to.equal('Are you sure you want to delete?')
        //})


        //2.0 crearemos un objecto para asegurar que devuelva un valor 0 o 1, para identificar
        //que la ventana o la alerta se ejecuto. luego llamaremos la ventana de confirmacion y cuando
        //esta se ejecute guardara el valor 1 o 0 verificar que el assert esta correcto.
        //const stub = cy.stub() //moqs and stub functions created
        //cy.on('window:confirm', stub)
        //cy.get('tbody tr').first().find('.nb-trash').click().then(()=> {
          //  expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')//when we get our function stub, expect callwith our assertion mesaage
            //stub will be empty when the event do not ocurr.
       // })

        //3.0 cypress not automatically confirm, select cancel in the dialog box
        //return false on aour window
       
        cy.on('window:confirm', ()=> false)

    })
})
