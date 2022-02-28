import { navigateTo } from "../../support/pages-objects/navigationPage"
import {onFormLayoutsPage} from "../../support/pages-objects/formLayoutsPage.js"
import { onDatePickerPage } from "../../support/pages-objects/datepickerPage"
import { onSmartTablePage } from "../../support/pages-objects/smartTablePage"
import { createYield } from "typescript"


describe('Page Object Suite', ()=>{

    beforeEach('open application', ()=>{  //instead visit each time, we want do something. hook or open the application for us
       cy.openHomePage()
    })

    it('veryfiying navigations actions the pages', ()=>{
        navigateTo.formLayoutsPage()
        navigateTo.daypickerPage()
        navigateTo.toastrPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    })
    it.only('shoul submit Inline form and select tomorrow date in the calendar', () =>{
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.sumitInlineFormWithNameAndEmail('Daynara', 'test@test.com')
        onFormLayoutsPage.sumitBasicFormWithEmailAndPassword('test@test.com','1234')
        navigateTo.daypickerPage()
        onDatePickerPage.selectCommonDatepickerFromToday(1)
        onDatePickerPage. selectDatepickerWithRangeFromToday(2,5)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
        onSmartTablePage.updateAgeByFirstName('Artem', '19')
        onSmartTablePage.deleteRowByIndex(0)

    })

    
})