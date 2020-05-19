module.exports = {
    name: 'shadow/boxShadow',
    type: 'value',
    matcher: function(prop) {
      return prop.attributes.category === 'shadow';
    },
    transformer: function(prop) {
      const boxShadow = [
        prop.original.x + 'px',
        prop.original.y +  'px',
        prop.original.blur + 'px',
        prop.original.color
      ]
      return boxShadow.join(' ');
    }
};