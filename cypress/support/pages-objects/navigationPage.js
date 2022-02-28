//creamos una nueva clase dentro de este object
function selectGroupMenuItem (groupName){
    cy.contains('a',groupName).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr','data-name').then( attr => {
            if (attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{ 
    //aqui vamos a crear las formas de navegacion por el menu como forms, form layouts, etc
    //nombramos y luego vamos
    formLayoutsPage(){
        selectGroupMenuItem('Forms')
        //cy.contains('Forms').click()
        cy.contains('Form Layouts').click()        
    }

    daypickerPage() {
        selectGroupMenuItem('Forms')
        //cy.contains('Forms').click() //instead using this, we call the function
        cy.contains('Datepicker').click()
    }

    toastrPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()        
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

}

//new instance of the navigationPAge
export const navigateTo = new NavigationPage()