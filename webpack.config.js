var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var CleanPlugin = require('clean-webpack-plugin');


/*Make sure the NODE_ENV is always set
If the file is call directly with node (node webpack.config.js) then the hot loader server will
be started and you can enjoy live editing.
if you call webpack command line then the production files will be created*/
process.env.NODE_ENV = process.env.NODE_ENV || (require.main === module ? 'development' : 'production');

// Configure host settings for the WebDevServer
var devserver = { ip: 'localhost', port: 3000 };
var contextDir = 'doc';
var config = {
  // we use path.join to make it work cross plateform
  context: path.join(__dirname, contextDir),
  entry:   process.env.NODE_ENV == 'production' ? {
    app: ['./index.js']
  } : {
    // WebpackDevServer is only required on development, with key value entry mode, the
    // webpack/hot/only-dev-server entry is required on each entry.
    app:    ['./index.js', 'webpack/hot/only-dev-server'],
    // The client entry is used to serve an iframe with reloading information
    // The final url will be http://localhost:3000/webpack-dev-server
    client: 'webpack-dev-server/client?http://' + devserver.ip + ':' + devserver.port
  },
  output:  {
    // Assets destination
    path:     path.join(__dirname, 'dist'),
    // The final entry file is located in dist/js folder
    // The name variable will the key used in the entry index
    // The hash is optional, but usefull for having unique url for caching purpose
    filename: 'js/[name]-[hash:8].js',

    // require to make the specific fonts work (absolute path),
    // the value is also used by the WebpackDevServer to serve assets
    publicPath: '/'
  },
  resolve: {
    // the fallback array contains a set of folder used by webpack to search
    // available assets used with the require keyword
    fallback: [
      path.join(__dirname, contextDir)
    ],

    // This is important if you want to refer to module resources. It is important
    // to use ~ symbol to reference module: @import '~font-awesome/scss/font-awesome';
    modulesDirectories: ['node_modules']
  },
  module:  {
    // The loaders section defines how webpack behaves when a resource need to be loaded.
    // A resource is anything loaded with the require keyword
    loaders: [{
      // regular expression to match only jsx file
      test:    /\.jsx?$/,
      exclude: /(node_modules)/,
      // The include keyword is used to limit the lookup scope used by webpack
      // with the hot reload configuration.
      include: path.join(__dirname, contextDir),
      // In production, we don't need react-hot as it include a lot of code.
      loaders: process.env.NODE_ENV == 'production' ?
      ['babel'] :
      ['react-hot', 'babel']
    }, {
      test:   /\.scss$/,
      // resolve-url allow to resolve url() please keep it mind to set the output.publicPath
      // to use absolute path. This is usefull is you have fonts and css folders on
      // different folders
      loader: process.env.NODE_ENV == 'production' ?
      // the plugin is used to store css content to an external file
      // without this plugin css will be store as a variable inside the final
      // bundle file
      ExtractTextPlugin.extract('css!resolve-url!sass') :

      // the style loader is usefull to load the style inline with WebpackDevServer
      'style!css!resolve-url!sass'
    },{
      test: /\.less$/,
      // resolve-url allow to resolve url() please keep it mind to set the output.publicPath
      // to use absolute path. This is usefull is you have fonts and css folders on
      // different folders
      loader: process.env.NODE_ENV == 'production' ?
      // the plugin is used to store css content to an external file
      // without this plugin css will be store as a variable inside the final
      // bundle file
      ExtractTextPlugin.extract('css!resolve-url!sass') :
      // the style loader is usefull to load the style inline with WebpackDevServer
      'style!css!less'
    },{
      // match woff fonts
      test:  /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // the file loader will copy the font into a dedicated folder
      // with the name argument it is possible to define a target to store the file
      // if the output.publicPath is set, then the final reference will be output.publicPath + name
      loader: 'file?name=fonts/[name]-[hash:8].[ext]'
    }, {
      test:  /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // the -loader suffix is optional so file or file-loader is equivalent
      loader: 'file-loader?name=fonts/[name]-[hash:8].[ext]'
    }, {
      test:  /\.png$/,
      loader: 'url?limit=100000'
    }, {
      test:  /\.jpg$/,
      loader: 'file'
    }]
  },
  plugins: [
    // this plugin will append on generated file the provided string, this can be useful
    // for copyright holder
    new webpack.BannerPlugin('This code is part of the Ekino Webpack Cheat Sheet Project', {
      raw:       false,
      entryOnly: false
    }),
    // this plugin must be used with the loader ExtractTextPlugin.extract
    // the final file will use the entry name and the hash for current
    // entry file
    new ExtractTextPlugin('css/[name]-[id]-[contenthash:8].css', {
      allChunks: true
    }),
    // the plugin will generate the index file inside the dist folder. The plugin
    // can inject all related js and css assets.
    new HtmlWebpackPlugin({
      inject:   true,
      title:    'Ekino Webpack Cheat Sheet Project',
      template: contextDir + '/index.html',
      filename: 'index.html'
    }),
    // this plugin will compute common chunks from entry files and related chunks to
    // optimize and reduce final file size
    new webpack.optimize.CommonsChunkPlugin({
      name:     'commons',
      filename: 'js/[name]-[hash:8].js',
      chunks:   [] // entries to use
    }),
    new webpack.DefinePlugin({
      VERSION:       JSON.stringify('0.0.1-DEV'),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // clean the dist folder before building assets
    new CleanPlugin(['dist'], __dirname)
  ]
};

if ('development' === process.env.NODE_ENV) {
  // define how assets will be available, the eval value is useful with the
  // HotModuleReplacementPlugin to reload code on change
  config.devtool = 'eval';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if ('production' === process.env.NODE_ENV) {
  // reduce the final size of javascript files
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      // warning: false
    },
    mangle:   {
      // default values
      except: ['$super', '$', 'exports', 'require']
    }
  }));
}

// make the config available so webpack can grab the configuration
module.exports = config;

// start the WebpackDevServer which handle hot reload
if (require.main === module && 'development' === process.env.NODE_ENV) {
  var server = new WebpackDevServer(webpack(config), {
    publicPath:         config.output.publicPath,
    hot:                true,
    historyApiFallback: true,
    stats:              {
      colors: true
    },
    progress:           true
  });

  server.listen(devserver.port, devserver.ip, function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at http://' + devserver.ip + ':' + devserver.port + '/webpack-dev-server/');
  });
}
