module.exports = {
    name: 'custom/scss',
    transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'size/rem',
        'color/css',
        'shadow/boxshadow' //combine shadow parameters into one boxshadow value
    ]
};