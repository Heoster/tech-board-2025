const http = require('http');

// Test the server
const testServer = () => {
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers:`, res.headers);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Response received:');
            console.log(data.substring(0, 200) + '...');
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
};

// Test API endpoint
const testAPI = () => {
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/api/health',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`API Status: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('API Response:', JSON.parse(data));
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with API request: ${e.message}`);
    });

    req.end();
};

console.log('Testing server...');
setTimeout(() => {
    testAPI();
    setTimeout(() => {
        testServer();
    }, 1000);
}, 2000);