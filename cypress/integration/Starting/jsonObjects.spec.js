///<reference types="cypress"/>


describe ("JSON Objects", ()=> {
    it("JSON Object", () =>{
        cy.openHomePage()

        const simpleObject = {"key":"value","key2":"value2"} //forma de crear objetos simples
        
        const simpleArrayOfValues = ["one", "two", "three"] //con corchetes y las posiciones comenzando 0

        const arrayOfObjects = [{"key":"value"}, {"key2":"value2"},{"key3":"value3"}]

        const typesOfData = {"string":"this is a string",
                             "number": 10 }
        
        const mix = {"FirstName": "Artem",
                     "LastName": "Bonder",
                     "Age": 35,
                     "Students":[{"firstName":"Sara",
                                  "lastName": "Conor"},
                                {"firstName": "Bruce",
                                 "lastName": "Willis"}
                                ]
        }

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])

        console.log(simpleArrayOfValues[1])

        console.log(arrayOfObjects[2].key3)

        console.log(mix.Students[1].firstName) //imprime el firstname de los estudiantes en la posicion 0

        const lastNameOfSecondStudent = mix.Students[0].lastName
        

    })
})