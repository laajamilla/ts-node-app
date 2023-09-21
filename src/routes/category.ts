
import express, { Response, Request } from 'express';
import { requestErrorHandler, successHandler } from '../responseHandler/index.js';
import { validate, validateDescription, validateDescriptionObl, validateIdObl, validateNameObl } from '../validationHandler/index.js';
import { Category } from "../types.js";


// http://expressjs.com/en/guide/routing.html

const category = express.Router();

const categoryList : Category[] = [
    {id:1001, name: "Kategoria1", description: "ensimmäinen"},
    {id:1002, name: "Kategoria2", description: "toinen"},
    {id:1003, name: "Kategoria3", description: "kolmas"},
    {id:1004, name: "Kategoria4", description: "neljäs"}
]
// haetaan kaikki
category.get(
    '/',
    (req: Request, resp: Response) => {

        successHandler(
            req,
            resp,
            categoryList,
            `Succesfully read categories from DB`,
        );
    }
);
// haetaan yksi
category.get(
    '/:id',
    validateIdObl,
    [validate],
    (req: Request, resp: Response) => {

        const foundOne = categoryList.filter(
            (value) => value.id === Number(req.params.id)
        );

        if(foundOne.length > 0) {

        successHandler(
            req,
            resp,
            foundOne,
            `Succesfully read category ${req.params.id} from DB`,
        );
    } else {
        requestErrorHandler(
            req,
            resp,
            `No category found for id ${req.params.id}`
        )
    }
    }
);
// POST- metodi, tarkistaa onko saman niminen olemassa.
category.post(
    '/',
    validateNameObl,
    validateDescription,
    [validate],
    (req: Request, resp: Response) => {

        const existisInDB = categoryList.find(
            (value) => value.name === req.body.name
        ) 
        if (!existisInDB) {

        successHandler(
            req,
            resp,
            7,
            `Succesfully added a category to DB`,
        );
     } else {
        requestErrorHandler(
            req,
            resp,
            `category ${req.body.name} all ready exists in DB`,
        )
     }
  
    }
);
// pakollinen kuvausteksti, jos jotain muutettu 
category.put(
    '/',
    validateIdObl,
    validateNameObl,
    validateDescriptionObl,
    [validate],
    (req: Request, resp: Response) => {

        successHandler(
            req,
            resp,
            1,
            `Succesfully updated category ${req.body.name} DB. Description: ${req.body.description}`,
        );
    }
);


export default category;