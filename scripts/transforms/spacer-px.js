module.exports = {
    name: 'size/spacerToPx',
    type: 'value',
    matcher: function(prop) {
      return (prop.attributes.category === 'size' && prop.attributes.type === 'spacer');
    },
    transformer: function(prop) {
      return prop.original.value + 'px';
    }
};