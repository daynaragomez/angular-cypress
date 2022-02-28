///<reference types = "cypress" />


describe('Suite Test Calendar', () => {
    it.only('Calendar test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.get('nb-layout-header nb-icon').find('[data-name="menu-2"]').click()

        //1. get the current date object
        let date = new Date() // get the object
        date.setDate(date.getDate() + 40 ) //current day feb16 + 13 days (mars1)
        let futureDay = date.getDate()
        let futureMonth= date.toLocaleString('default', {month:'short'}) //get the month and the short name of the month "Dec, May, Aug..."


        cy.contains('nb-card', 'Common Datepicker').find('input').then ( input => {
            cy.wrap(input).click()

        
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                 if(!dateAttribute.includes(futureMonth)){
                     cy.get('[data-name="chevron-right"]').click()
                     cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()

                 }
                  else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click() //if not includes futureDate en                 cy.get('nb-calendar-day-picker').contains(futureDate).click() //if not includes futureDate en nb

                 }
            })
    


       })

    })
})




