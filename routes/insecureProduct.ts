/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as models from '../models/index'
import * as utils from '../lib/utils'

export function retrieveInsecureProduct () {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    models.sequelize.query(`SELECT * FROM Products WHERE id = ${id} AND deletedAt IS NULL`)
      .then(([products]: any) => {
        for (let i = 0; i < products.length; i++) {
          products[i].name = req.__(products[i].name)
          products[i].description = req.__(products[i].description)
        }
        res.json(utils.queryResultToJson(products))
      }).catch((error: Error) => {
        next(error)
      })
  }
}
