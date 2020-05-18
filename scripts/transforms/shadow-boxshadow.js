module.exports = {
    name: 'shadow/boxshadow',
    type: 'value',
    matcher: function(prop) {
      return prop.attributes.category === 'shadow';
    },
    transformer: function(prop) {
      const boxShadow = [
        prop.original.x + 'px',
        prop.original.y +  'px',
        prop.original.blur + 'px',
        prop.original.colour
      ]
      return boxShadow.join(' ');
    }
};