import { describe, it, expect, vi } from 'vitest';
import { Server } from '../src/server';
import sequelizeConnection from '../src/conf/sequelize.connection';

vi.mock('../src/server.ts');
vi.mock('../src/conf/sequelize.connection.ts', () => ({
    default: {
        getSequelize: vi.fn(() => ({
            define: vi.fn(() => ({}))
        })),
        connect: vi.fn().mockResolvedValue(undefined)
    }
}));

describe('App testing', () => {
    it('should call the server function', async () => {
        const spyDB = vi.spyOn(sequelizeConnection, 'connect');

        await import('../src/app.ts');

        expect(spyDB).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenLastCalledWith({
            port: Number(process.env.PORT),
            routes: expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalledTimes(1);
    });
});