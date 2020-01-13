'use strict';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-nwabap-ui5uploader');

    grunt.initConfig({
        nwabap_ui5uploader: {
            options: {
                conn: {
                    server: process.env.UI5_TASK_NWABAP_DEPLOYER__SERVER,
                    useStrictSSL: false,
                    client: process.env.UI5_TASK_NWABAP_DEPLOYER__CLIENT,
                    language: 'EN'
                },
                auth: {
                    user: process.env.UI5_TASK_NWABAP_DEPLOYER__USER,
                    pwd: process.env.UI5_TASK_NWABAP_DEPLOYER__PASSWORD
                }
            },
            dev: {
                options: {
                    ui5: {
                        package: '$TMP',
                        create_transport: false,
                        transport_use_user_match: false,
                        transport_use_locked: false,
                        bspcontainer: '<bsp_container>',
                        bspcontainer_text: '<description>',
                        calc_appindex: true
                    },
                    resources: {
                        cwd: 'dist',
                        src: ['**/*.*', '!**/*.scss']
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['nwabap_ui5uploader']);
};
