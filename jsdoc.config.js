module.exports = {
  plugins: [],
  recurseDepth: 10,
  source: {
    include: ['lib', 'index.js', 'lib/tools', 'lib/fake'],
    exclude: [ /* array of paths to exclude */ ],
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  sourceType: 'module',
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
    default: {
      outputSourceFiles: false,
      staticFiles: {
        include: ['./jsdoc_style']
      }
    }
  }
}
