/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as utils from '../lib/utils'
import * as models from '../models/index'

export function searchUsers () {
  return (req: Request, res: Response, next: NextFunction) => {
    const searchTerm = (req.query.q as string) ?? ''
    models.sequelize.query(`SELECT id, email, role FROM Users WHERE email LIKE '%${searchTerm}%' AND deletedAt IS NULL`)
      .then(([users]: any) => {
        res.json(utils.queryResultToJson(users))
      }).catch((error: Error) => {
        next(error)
      })
  }
}
