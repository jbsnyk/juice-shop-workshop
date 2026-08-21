/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Sequelize } from 'sequelize'
import * as models from '../models/index'

type QueryRunner = Pick<Sequelize, 'query'>

export const findUserByEmailUnsafe = async (email: string, database: QueryRunner = models.sequelize) => {
  return await database.query(`SELECT * FROM Users WHERE email = '${email}' AND deletedAt IS NULL`)
}
