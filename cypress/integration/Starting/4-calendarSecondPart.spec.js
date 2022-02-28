//Segunda Parte de pruebas de CALENDARIO
//aqui vamos a reordenar escribir una funcion para poder buscar la fecha con mas de 30 dias 
//el ejercicio anterior solo es capaz de buscar hasta 1 mes 30dias. repetitiva logica hasta que 
//el dia sea seleccionado o tener de correcto mes
//


///<reference types = "cypress" />

describe('Suite Test Calendar', () => {
    it.only('Calendar test', () => {

        //usando Date Object

        function selectDayFromCurrent(day) { //pasaremos el parametro dia cuantos dias from today
            let date = new Date() // get the object
            date.setDate(date.getDate() + day ) //current day feb16 + 13 days (mars1)
            let futureDay = date.getDate()
            let futureMonth= date.toLocaleString('default', {month:'short'}) //get the month and the short name of the month "Dec, May, Aug..."
            let dateAssert = futureMonth + ' ' + futureDay + ', '+ date.getFullYear()
    
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                //creamos un if para hacer click en la flecha en caso de pasar al siguiente mes hasta encontrar el dia solicitado
                if(!dateAttribute.includes(futureMonth)){ //sino tiene el correcto dia lo llamara de nuevo
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)

                }
                 else {
                     cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click() //if not includes futureDate en                 cy.get('nb-calendar-day-picker').contains(futureDate).click() //if not includes futureDate en nb

                }
           })
           return dateAssert //lo llamamos para que devuelva el valor, estaba en gris como sino tenia nada

        }


        //Aqui es donde de verdad probamos o realizamos el cypress test.

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.get('nb-layout-header nb-icon').find('[data-name="menu-2"]').click()      

        cy.contains('nb-card', 'Common Datepicker').find('input').then ( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(30)

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert) // en el ejemplo anterior el formato lo dabamos 'Dec 17, 2019'
            //aqui lo vamos a tomar del sistema creandolo con nuestras variables con dateAssert
       })

    })
})

