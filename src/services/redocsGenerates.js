const handlebars  = require('express-handlebars');
// const expressAuth = require('express-basic-auth');
const pathModule = require('path');
const url = require('url') ;
const swaggerJSDoc = require('swagger-jsdoc');

module.exports.setupExpressSwagger = async (
    path,
    app,
    document,
    options
) => {
    if (!options){
        options = {
            docName: "swagger",
            title: 'Payment gateway api documentation',
            sortPropsAlphabetically: true,
            hideDownloadButton: false,
            hideHostname: false,
            auth: {
                enabled: true,
                user: 'duyphuongprovip',
                password: '123456'
            },
        }
    }
    // Normalize URL path to use
    const finalPath = path.charAt(0) !== '/' ? '/' + path : path;
    // Add a slash to the end of the URL path to use in URL resolve function
    const resolvedPath = finalPath.slice(-1) !== '/' ? finalPath + '/' : finalPath;
    // Serve swagger spec in another URL appended to the normalized path
    const docUrl = url.resolve(resolvedPath, `api-docs.json`);
    // create helper to convert metadata to JSON
    const hbs = handlebars.create({
        helpers: {
            toJSON: function (object) {
                return JSON.stringify(object);
            },
        },
    });
    // spread redoc options
    const { title, favicon, theme, redocVersion, ...otherOptions } = options;
    // create render object
    const renderData = {
        data: {
            title,
            docUrl,
            favicon,
            redocVersion,
            options: otherOptions,
            ...(theme && {
                theme: {
                    ...theme,
                },
            }),
        },
    };
    // this is our handlebars file path
    const redocFilePath = pathModule.join(
        __dirname,
        '..',
        'public',
        'redoc.handlebars'
    );
    return await hbs.render(redocFilePath, renderData);
}