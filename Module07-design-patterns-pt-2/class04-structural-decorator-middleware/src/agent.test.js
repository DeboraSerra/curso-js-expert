import { expect, it, describe, jest, beforeEach } from '@jest/globals'
import { Server } from 'http'
import { InjectHttpInterceptor } from './agent.js'

const originalHttp = jest.createMockFromModule('http');

describe('InjectHttpInterceptor', () => {
  const eventName = 'request';
  const request = null
  beforeEach(jest.clearAllMocks)
  it('should change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }
    const serverInstance = new originalHttp.Server()
    serverInstance.emit(eventName, request, response)
    expect(response.setHeader).not.toHaveBeenCalled()
  })
  it('should activate header interceptor', () => {
    InjectHttpInterceptor()
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }
    const serverInstance = new Server()
    serverInstance.emit(eventName, request, response)
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'DebsSerra')
  })
})