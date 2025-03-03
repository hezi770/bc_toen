import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';

const server = Fastify({
    logger: {
        transport: {
            target: "pino-pretty"
        },
    }
});

server.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'dist')
});


try {
    await server.listen({ port: 3000 });
    server.log.info(`Server listening on 3000`);
} catch (error) {
    server.log.error(error);    
    process.exit(1);
}

if (import.meta.hot) {
    import.meta.hot.on("vite:beforeFullReload", () => {
        server.log.warn('Server is restarting...');
        server.close();
    });
}