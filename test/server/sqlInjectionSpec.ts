/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Sequelize } from 'sequelize'
import chai from 'chai'
import { findUserByEmailUnsafe } from '../../lib/sqlInjection'

const expect = chai.expect

describe('sqlInjection', () => {
  describe('findUserByEmailUnsafe', () => {
    it('concatenates user input directly into the SQL query', async () => {
      let capturedSql = ''
      const database = {
        query: async (sql: string) => {
          capturedSql = sql
          return []
        }
      } as unknown as Pick<Sequelize, 'query'>

      await findUserByEmailUnsafe("' OR 1=1 --", database)

      expect(capturedSql).to.equal("SELECT * FROM Users WHERE email = '' OR 1=1 --' AND deletedAt IS NULL")
    })
  })
})
