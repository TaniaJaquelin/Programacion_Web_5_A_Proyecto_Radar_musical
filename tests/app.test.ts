import { describe, it, expect, vi } from 'vitest';
import { Server } from '../src/server';
import dbConnection from '../src/conf/dbConnection';

// mock routes
vi.mock('../src/routes/index', () => ({
    default: vi.fn()
}));

// explicit mock for server class
vi.mock('../src/server', () => {
    const ServerMock = vi.fn();
    ServerMock.prototype.start = vi.fn();
    return { Server: ServerMock };
});

// mock database connection
vi.mock('../src/conf/dbConnection', () => ({
    default: {
        connect: vi.fn().mockResolvedValue(undefined)
    }
}));

describe('App testing', () => {
    it('should connect to database and start the server', async () => {
        const spyDB = vi.spyOn(dbConnection, 'connect');

        // import app.ts to execute startApp()
        await import('../src/app');

        expect(spyDB).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenLastCalledWith({
            port: Number(process.env.PORT) || 3000,
            routes: expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalledTimes(1);
    });
});