import express, { Response, Request } from 'express';
import { successHandler } from '../responseHandler/index.js';
import { validate, validateIdObl, validateNameObl } from '../validationHandler/index.js';
import { Building } from '../types.js';


const building = express.Router();

const buildingList : Building[] = [
  {id:3001, name:"Pääarakennus", description:""},
  {id:3002, name:"Sivuarakennus", description:""},
  {id:3003, name:"Navetta", description:""},
]


//get all buildings
building.get(
  '/',
  //[validate],
  (req: Request, res: Response) => {
    
        successHandler(
          req,
          res,
          buildingList,
          //{id:3001, name:"Pääarakennus", description:""},
          'Successfully read the buildings from DB',
        );
    }
);

building.get(
  '/:id',
  validateIdObl,          // luo virheitä request- olioon, jos löytää niitä
  [validate],             // tarkastaa, ettei ole virheitä
  (req: Request, res: Response) => {
    
    const foundOne = buildingList.filter(
      (value) => value.id === Number(req.params.id)
    );
        successHandler(
          req,
          res,
          foundOne,
          //{id:3001, name:"Pääarakennus", description:""},
          'Successfully read one buildings from DB',
        );
    }
);

building.post(
  '/',
  
  validateNameObl,
  [validate],
  (req: Request, res: Response) => {
    
        successHandler(
          req,
          res,
          3004,
          'Successfully read the buildings from DB',
        );
    }
);

// UPDATE existing building in DB

building.put(
  '/',
  validateIdObl,
  validateNameObl,
  [validate],
  (req: Request, res: Response) => {
    
    const id:number = Number(req.body.id);

        successHandler(
          req,
          res,
          1,    // number of affected rows
          `Successfully updated building with id: ${id}`,
        );
    }
);



export default building;