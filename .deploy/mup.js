module.exports = {
    servers: {
        one: {
            // TODO: set host address, username, and authentication method
            host: '167.71.204.64',
            username: 'root',
            // pem: './path/to/pem'
            password: 'rRqwer123##$$r'
            // or neither for authenticate from ssh-agent
        }
    },

    meteor: {
        // TODO: change app name and path
        name: 'backendrpitsb',
        path: '../.',

        servers: {
            one: {},
        },

        buildOptions: {
            serverOnly: true,
        },

        env: {
            // TODO: Change to your app's url
            // If you are using ssl, it needs to start with https://
            PORT: 8919,
            ROOT_URL: 'http://128.199.118.7',
            MONGO_URL: 'mongodb://localhost/websitebackend',
            //MONGO_OPLOG_URL: 'mongodb://mongodb/local',
            TZ: 'Asia/Bangkok'
        },

        docker: {
            // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
             //image: 'abernix/meteord:node-8.4.0-base',
            image: 'zodern/meteor',
            //image: 'abernix/meteord:node-12.14.0-base',
            //image: 'abernix/meteord:base',
        },

        // Show progress bar while uploading bundle to server
        // You might need to disable it on CI servers
        enableUploadProgressBar: true
    },

    mongo: {
        port: 27017,
        version: '4.4',
        oplog: true,
        servers: {
            one: {}
        }
    },

    // (Optional)
    // Use the proxy to setup ssl or to route requests to the correct
    // app when there are several apps

    // proxy: {
    //   domains: 'mywebsite.com,www.mywebsite.com',

    //   ssl: {
    //     // Enable Let's Encrypt
    //     letsEncryptEmail: 'email@domain.com'
    //   }
    // }
};
