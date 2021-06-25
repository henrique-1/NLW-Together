import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";

const app = express();

app.use(express.json());

/**
* GET     => Buscar uma informação
* POST    => Inserir uma informação
* PUT     => Alterar uma informação
* DELETE  => Remover um dado
* PATCH   => Alterar informação especifica
*/

/**
 * Tipos de parâmetros
 * Route Params => http://localhost:3000/products/13461237461
 * Query Params => http://localhost:3000/products?name=teclado&description=tecladotop
 * 
 * Body Params  => {
 *  "name": "Teclado",
 *  "description": "Teclado bom"
 * }
 */

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })
})

app.listen(3000, () => console.log("Server is running"));