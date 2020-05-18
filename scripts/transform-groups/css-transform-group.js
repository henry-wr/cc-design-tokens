module.exports = {
    name: 'custom/css',
    transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'size/rem',
        'size/spacerToPx',
        'color/css',
        'shadow/boxShadow' //combine shadow parameters into one boxshadow value
    ]
};