const { createYield } = require("typescript")

//      WEB tables
///<reference types="cypress"/>

describe ('Our suite test 2 - Tables', () => {

    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        //cy.get('ngx-header nb-icon').find('[data-name="menu-2"]').click() //esto para cerrar el menu que esta solapando la opcion

        //1.0
        cy.get('tbody').contains('tr', 'Larry').then ( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click() //una vez encontrado la clase nb-edit el editor de la linea hacer click en el
            //encuentra el espacio de age que quiero modificar placeholder="Age"(el atributo unico) y tipea 25
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')     
            
            cy.wrap(tableRow).find('.nb-checkmark').click() //encuetra el check y hazle click para salvar cambios
            cy.wrap(tableRow).find('td').should('contain','25') //encuentra la columna que deberia tener 25

        })

        //2.0 aregar un nuevo registro
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Daynara')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Gomez')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        //3.0 columnas - vamos a chequear que el nombre y el apellido se guardaron correctamente
        cy.get ('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain','Daynara')
            cy.wrap(tableColumns).eq(3).should('contain','Gomez')

        })

        //4.0 vamos a buscar ciertas edades y ver cuantos registro trae por cada edad.
        const age = [20, 30, 40, 200] //un arreglo que contiene las edades a buscar 
        
        cy.wrap(age).each( age => {
            cy.get('thead placeholder="Age"').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain','No data found')
                }
                else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
 
    })

})

