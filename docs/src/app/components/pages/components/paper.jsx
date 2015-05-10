var React = require('react');
var mui = require('mui');
var Paper = mui.Paper;
var ComponentDoc = require('../../component-doc.jsx');

class PaperPage extends React.Component {

  render() {

    var code = [
      '//Rounded Corners',
      '<Paper zDepth={1}>',
      '  <p>zDepth=1</p>',
      '</Paper>',
      '<Paper zDepth={2}>',
      '  <p>zDepth=2</p>',
      '</Paper>',
      '<Paper zDepth={3}>',
      '  <p>zDepth=3</p>',
      '</Paper>',
      '<Paper zDepth={4}>',
      '  <p>zDepth=4</p>',
      '</Paper>',
      '<Paper zDepth={5}>',
      '  <p>zDepth=5</p>',
      '</Paper>',
      '//Sharp Corners',
      '<Paper zDepth={1} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={2} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={3} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={4} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={5} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '//Circular',
      '<Paper zDepth={1} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={2} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={3} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={4} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={5} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>'
      ].join('\n');

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'circle',
            type: 'bool',
            header: 'default: false',
            desc: 'Set to true to generate a circlular paper container.'
          },
          {
            name: 'rounded',
            type: 'bool',
            header: 'default: true',
            desc: 'By default, the paper container will have a border radius. ' +
              'Set this to false to generate a container with sharp corners.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of Paper\'s root element.'
          },
          {
            name: 'zDepth',
            type: 'number (0-5)',
            header: 'default: 1',
            desc: 'This number represents the zDepth of the paper shadow.'
          }
        ]
      }
    ];

    var styles = {
      height: 100,
      width: 100,
      margin: '0 auto',
      marginBottom: 64,
    };

    return (
      <ComponentDoc
        name="Paper"
        code={code}
        componentInfo={componentInfo}>

        <div className="paper-examples">
          <div className="paper-examples-group">
      	    <Paper style={styles} className="mui-paper-container" zDepth={1}>
      	      <p>zDepth=1</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={2}>
      	      <p>zDepth=2</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={3}>
      	      <p>zDepth=3</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={4}>
      	      <p>zDepth=4</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={5}>
      	      <p>zDepth=5</p>
      	    </Paper>
          </div>

          <div className="paper-examples-group">
      	    <Paper style={styles} className="mui-paper-container" zDepth={1} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={2} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={3} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={4} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={5} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
          </div>

          <div className="paper-examples-group">
      	    <Paper style={styles} className="mui-paper-container" zDepth={1} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={2} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={3} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={4} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} className="mui-paper-container" zDepth={5} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
          </div>
        </div>

      </ComponentDoc>
    );
  }

}

module.exports = PaperPage;
