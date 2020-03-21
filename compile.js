const fs = require('fs');
const path = require('path');
const pug = require('pug');

const LAYOUTS = path.resolve(__dirname, 'src', 'views');
console.log(LAYOUTS);

const buildLayouts = async () => {
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
                const doctype = view === 'sitemap' ? 'xml' : 'html';
                return {
                    name: view,
                    content: pug.renderFile(fileName, {
                        pretty: true,
                        doctype
                    }),
                    extension: doctype
                };
            })
        )
        .then(pages =>
            Promise.all(
                pages.map(({ name, content, extension }) => {
                    const fileName = path.resolve('dist', `${name}.${extension}`);
                    return new Promise(resolve =>
                        fs.writeFile(fileName, content, err => {
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
