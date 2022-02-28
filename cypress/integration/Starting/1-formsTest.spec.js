///<reference types="cypress"/>

describe ('Our first suite', () => {

    it ('first test', () => {
       cy.visit('/')
       cy.contains('Forms').click()
       cy.contains('Form Layouts').click()

        //find elements by Tag name
        cy.get('input')

        //by ID add #
        cy.get('#inputEmail1')

        //by Class Name add .
        cy.get('.input-full-width')

        //by Attribute name add []
        cy.get('[placeholder]')

        //by Attribute name and value add []
        cy.get('[placeholder="Email"]')

        //by Class value add [] and use the entire string on the class
        cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        //by Tag name attribute with value
        cy.get('input[placeholder="Email"]')

        //by diferents attributes two or more as many as we need
        cy.get('[placeholder="Email"][type="email"]')

        //by Tag name, attribute with value, ID and class name: this comes everythin together without space or comas
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //the most recommended way by Cypress is adding a tag code to identify
        //the own attributes and data
        cy.get('[data-cy="inputEmail"]') 



    })

    it('Second test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //by my Tag
        cy.get('[data-cy="singInButton"]')
       
        
        //by context or how is writen in the button
        cy.contains('Sign in')

        //look for web element with the locator attribute name "status" 
        // with value warning which contains Sing in
        cy.contains('[status="warning"]','Sign in')

        //supongamos que no podemos conseguir un idetificador unico para este boton.
        //the button doesn't have id , find element by ID withou any identifier, find unique id
        //we need to go througt the section in this case 'Horizontal form' and the first element 
        //email, check the first id find this section.. then travel throught until get the element needed
        //so we pass up until resaltar los elemetos del formulario que incluyan el boton (form padre) y luego encontrar el hijo elemento

        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain','Sign in') //until here we find the button.throught the parents to child
        //para encontrar el check list remember me de nuevo viajamos de padre a hijo
        .parents('form')
        .find('nb-checkbox') //use the label tag HTML
        .click()


        //find method is only to find a child, so not working if I try to find somenthing without goes throu their parents
       // cy.find('button') this not working

       //encuentra hijo email, que esta en cabecera horizontal form y nb_card papa
       cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })

    it('then and wrap methods', () =>{ //"it.only"->ONLY se usa para decir que cypress corra solo esta section
        cy.visit('/')
        cy.contains ('Forms').click()
        cy.contains('Form Layouts').click()

        //THIS IS NOT THE BEST WAY, REAPEAT CODE
        //vamos a verificar email and pass en dos sectiones 
        //using the grid and basic form y encontramos etiqueta Email(label) o texto
       // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
       // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

        //BASIC FORM... second parameter
        //cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        //cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

        //LIKE SELENIUM, IT DOES NOT WORK
        //const firstForm = cy.contains('nb-card', 'Using the Grid')
        //firstForm.find('[for="inputEmail1"]').should('contain','Email')
        //firstForm.find('[for="inputPassword2"]').should('contain','Password')

        //const secondForm=cy.contains('nb-card', 'Basic form')
        //secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')
        //will not working because cypress not save the object or constants.
    
//      CYPRESS STYLE
        //we make all above in a callback function by using THEN, this style is with JQuery son no can conbine with cypress methods like click()
        cy.contains('nb-card', 'Using the Grid').then( firstForm => { //this Jquery code
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text() //save the child in the const
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => { //secondForm is a parameter that contain the Jquery asertion

                const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
               // expect(emailLabelFirst).to.equal(emailLabelSecond) //our assertion: this is false. they are not equals
                expect(emailLabelSecond).to.equal('Email address') 
                //we assume that the second label password is equal to the second, so we call it because we are at the same code inside the cy.contains    
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond) //our assertion: that passwordLabelFirst is equal to passwordLabelSecond. TRUE
                //this code works because is inside of the other form so we can compare both

                //CONVERTIR DE JQUERY A CYPRESS
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')


            })

        })
        


    })
//1.0
    it('Invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1. way tha we saw
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        //2. way learned Jquery element saved in label
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })

        //3. is using Invoke command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then (text => {
            expect(text).to.equal('Email address')
        })

        //2.0.traajando con los valores de los atributos
        //see if the checkbox is checked or not. wrap the value of the class
        cy.contains('nb-card','Basic form')
             .find('nb-checkbox')
             .click()
             .find('.custom-checkbox')
             .invoke('attr','class') //invocar el atributo de la clase
             //.should('contain','checked') //make assertion that contains 1st way

             //2nd.  way change ".should" for ".then" in order to work with the value of the class
             .then(classValue => {
                 expect(classValue).to.contain('checked')
             })
             
    })

    //3.0
    //como probar propiedades de los elemtos como calendario
    it('Assert property',() =>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card','Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-datepicker-container').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain','Feb 17, 2022')
        })
    })

    //trabajando con radio botones que son botones opcionales. 
    it('radio buttons', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons =>{
            cy.wrap(radioButtons)
            .first() //cypress probara el primer elemento
            .check({force:true}) //forzamos colocando en verdadero para que el radio este check

            cy.wrap(radioButtons)
            .eq(1) // diciendo por medio de un indice el segundo elemento a probar
            .check({force:true})

            cy.wrap(radioButtons)
            .eq(0) //el elemento 0 o el 1er elemento "first" es el mismo resultado
            .should('not.be.checked')

            //3era opcion de los elementos es el "disable" este solo se ve al inspect
            cy.wrap(radioButtons)
            .eq(2) //este se supone es el 3er boton que no se puede click por que no esta visible en la aplicacion deshabilitado
            .should('not.be.checked')
        })   
    })

    //boxes de check, aqui verificamos que esten checkeados o no 
    it('check boxes', () => { 
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force:true})//cypress solo hace check en el box que no esta marcado
        //si algun box ya esta marcado cypress no puede desmarcar o descheckear.
        cy.get('[type="checkbox"]').eq(0).click({force:true}) //debemos hacer que cypress al hacer click chequee los boxes y forzarlo con verdadero
        cy.get('[type="checkbox"]').eq(1).click({force:true})
        cy.get('[type="checkbox"]').eq(2).click({force:true})


    })

    it.only('List and dropDowns', () =>{
        cy.visit('/')
        //1.0
        //cy.get('nav nb-select').click() //decirle navigator vaya a nb_selector y haga click
        //cy.get('.option-list').contains('Dark').click()

        //cy.get('nav nb-select').should('contain','Dark')
        //cy.get('nb-layout-header').should('have.css','background-color','rgb(34, 43, 69)') //esto funciona para cuando buscamos probar 1
        //pero si quermos probar toda la lista debemos hacerlo de otra forma, y evitar el copiar y pegar y redundar codigo

        //2.0 

        cy.get('nav nb-select').then(dropdown  => { //'nav nb-select' is our menu
            cy.wrap(dropdown).click() //to click to show the list
            cy.get('.options-list nb-option').each( (listItem, index) => { //'.option-list nb-option' first locator is by class name and 2nd is by tag name here result 4 elements of the list
                //and we want to go through EACH option and make something. 
                const itemText = listItem.text().trim() //suprima con trim el texto que contiene de ma o el espacio vacio ' Dark'

                const colors = {"Light":"rgb(255, 255, 255)",//colors is a simple object json
                                "Dark":"rgb(34, 43, 69)",
                                "Cosmic":"rgb(50, 50, 89)",
                                "Corporate":"rgb(255, 255, 255)"
                             }

                cy.wrap(listItem).click() //haz click en una opcion de la lista
                cy.wrap(dropdown).should('contain',itemText) //esta opcion debe contener un texto o nombre
                cy.get('nb-layout-header nav').should('have.css','background-color',colors[itemText]) 
                //en la cabecera y el hijo debe haber un estilo css con background-color 
                //donde la opcion de color esta seleccionada por el itemtext o el texto.
                
                if (index <3){
                    cy.wrap(dropdown).click()//como la lista se contrae despues de seleccionar la opcion debemos abrirla haciendo click nuevamente

                }
                

            })

        })


    })


})
