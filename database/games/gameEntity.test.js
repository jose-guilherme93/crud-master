import { describe, it, expect, afterAll } from 'vitest'
import { createType } from './gameEntity.js'
import { pool } from '../connectDatabase.js'

describe('createType()', () => {
  it('executa sem lançar erro', async () => {
    const result = await createType(pool)
    expect(result).not.toBeNull()
  })
})

afterAll(async () => {
  await pool.end()
})
