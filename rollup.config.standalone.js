import buble from 'rollup-plugin-buble';

export default {
    entry: 'src/tabs-standalone.microlib.js',
    plugins: [buble()]
}
