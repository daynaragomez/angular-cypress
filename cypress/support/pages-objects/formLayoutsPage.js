
export class FormLayoutsPage{
    
    sumitInlineFormWithNameAndEmail(name, email){
 
     cy.contains('nb-card', 'Inline form').find('form').then(form =>{
        cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
        cy.wrap(form).find('[placeholder="Email"]').type(email)
        cy.wrap(form).find('[type="checkbox"]').check({force: true})
        cy.wrap(form).submit() //this "sumit()" is a method cypress usable only in web form tag <form/>
        //another way is by clicking in the button submit near to the remember me.
    }) 
   }

   sumitBasicFormWithEmailAndPassword(email,password){
       
       cy.contains('nb-card', 'Basic form').find('form').then(form =>{
           cy.wrap(form).find('[placeholder="Email"]').type(email)
           cy.wrap(form).find('[placeholder="Password"]').type(password)
           cy.wrap(form).find('[type="checkbox"]').check({force: true})
           cy.wrap(form).submit()
       })
   }
}
export const onFormLayoutsPage = new FormLayoutsPage()

