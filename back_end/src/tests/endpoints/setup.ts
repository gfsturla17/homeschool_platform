import app from "../../app";

let server: any;

const setupEndpointTests = async () => {
    server = await app.listen(0); // Listen on a dynamic port
    process.env.TEST_SERVER_PORT = server.address().port.toString(); // Save the dynamic port for use in tests
    return server;
};

export default setupEndpointTests;
