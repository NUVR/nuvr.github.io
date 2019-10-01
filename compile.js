const fs = require('fs');
const path = require('path');
const pug = require('pug');

const LAYOUTS = path.resolve(__dirname, 'src', 'views');
console.log(LAYOUTS);

const buildLayouts = () => {
    return new Promise(resolve => {
        fs.readdir(LAYOUTS, (err, files) => {
            if (err) throw err;
            resolve(files.filter(file => file.includes('.pug')));
        });
    })
        .then(views => views.map(view => view.split('.pug')[0]))
        .then(views =>
            views.map(view => {
                const fileName = path.resolve(LAYOUTS, `${view}.pug`);
                return { name: view, html: pug.renderFile(fileName, { pretty: true }) };
            })
        )
        .then(html =>
            Promise.all(
                html.map(({ name, html }) => {
                    const fileName = path.resolve('dist', `${name}.html`);
                    return new Promise(resolve =>
                        fs.writeFile(fileName, html, err => {
                            if (err) throw err;
                            resolve(name);
                        })
                    );
                })
            )
        );
};

buildLayouts()
    .then(files => console.log('Copied files', files))
    .catch(console.error);
