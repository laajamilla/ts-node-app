
import express, { Response, Request } from 'express';
import { successHandler } from '../responseHandler/index.js';
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

        successHandler(
            req,
            resp,
            foundOne,
            `Succesfully read category from DB`,
        );
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
        // jos määrittää statuksen, ei saa viestiä.
        // jos laittaa viestin, status ei muutu. MIKSI?
        //resp.status(304);
        //resp.status(304).send('category allready exists');
        resp.send('category allready exists');
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
            `Succesfully added a category to DB`,
        );
    }
);


export default category;