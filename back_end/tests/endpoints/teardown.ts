const teardownEndpointTests = async (server: any) => {
    if (server) {
        await server.close(); // Close the server
    }
};

export default teardownEndpointTests;
