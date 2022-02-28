
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
              

            }
             else {
                 cy.get('.day-cell').not('.bounding-month').contains(futureDay).click() //if not includes futureDate en                 cy.get('nb-calendar-day-picker').contains(futureDate).click() //if not includes futureDate en nb

            }
       })
       return dateAssert //lo llamamos para que devuelva el valor, estaba en gris como sino tenia nada

    }


export class DatepickerPage {
    selectCommonDatepickerFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
            cy.wrap(input).should('have.value',dateAssert)
        })
    }

    selectDatepickerWithRangeFromToday(firstDay,secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input =>{
            cy.wrap(input).click()
            let dateAssertfirst = selectDayFromCurrent(firstDay)
            let dateAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateAssertfirst + ' - ' + dateAssertSecond
            cy.wrap(input).invoke('prop','value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })
    }
    
}

export const onDatePickerPage = new DatepickerPage()