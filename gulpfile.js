const path = require('path');
const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const TS_DIR = path.join(".", "ts");
const JS_DIR = path.join(".", "js");
async function CompileTypeScript() {
    console.log('CompileTypeScript...');
    return rollup.rollup({
        input: path.join(TS_DIR,'index.ts'),
        external:[
            'cesium'
        ],
        plugins: [
            rollupTypescript({
                tsconfig: path.join(TS_DIR, 'tsconfig.json'),
            })
        ]
    }).then(bundle => {
        return bundle.write({
            file: path.join(JS_DIR,'index.js'),
            format: 'umd',
            name: 'TTT',
            indent: '\t',
            sourcemap: true,
            globals: {
                cesium: 'Cesium',
            }
        });
    }).then(bundle => {
        console.log('CompileTypeScript done');
        return bundle;
    });
}
gulp.task('watch', async function () {
    let watchOpts = {
        queue: true,
    }
    return gulp.watch(path.join(TS_DIR, '*.ts'), watchOpts, async function (cb) {
        return CompileTypeScript();
    });
});
gulp.task('tsc',async function(cb){
    return CompileTypeScript().then(cb());
});
gulp.task('default',function(cb){
    runSequence(
        ['tsc'],
        cb
    );
});