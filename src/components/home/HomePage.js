import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cyan50, pink50 } from 'material-ui/styles/colors';
import * as loginActions from '../../actions/loginActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.buildFromGithubLogin = this.buildFromGithubLogin.bind(this);
    this.useLocalDeploymentLogin = this.useLocalDeploymentLogin.bind(this);
  }

  buildFromGithubLogin() {
    if (!this.props.login) {
      $('.loginButton').trigger('click');
    } else {
      browserHistory.push('/user');
    }
  }

  useLocalDeploymentLogin() {
    if (!this.props.login) {
      $('.loginButton').trigger('click');
    } else {
      browserHistory.push('/ngh/user');
    }
  }

  render() {
    return (
      <div className="ui relaxed stackable grid container">
        <br />
        <div className="ui raised fluid segment text sixteen wide padded grid">
          <div className="four wide column">
            <a href="http://www.cloudcv.org/">
              <img className="ui centered fluid medium bordered rounded image" src={require("./cloudcv_logo.png")}/>
            </a>
          </div>
          <div className="twelve wide padded text container column grid">
            <div className="row">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              <br />
              <div className="ui bulleted list">
                <div className="item">Gaining Access</div>
                <div className="item">Inviting Friends</div>
                <div className="item">Warranty</div>
              </div></div>
            <br />
            <div className="row">
              <div className="ui raised fluid text sixteen wide padded grid">
                <div className="eight wide center aligned column">
                  <div className="ui raised secondary segment">
                    <Link to="/documentation">
                      Do Something
                    </Link>
                  </div>
                </div>
                <div className="eight wide center aligned column">
                  <div className="ui raised secondary segment">
                    <Link to="/documentation">
                      Here Also
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="three column centered stretched row">

          <div className="column center aligned">
            <div className="ui blue fluid segment">

              <Link className="ui ribbon label raised fluid padded text container segment" to={this.props.login ? '/user' : '/'}
                    onClick={this.buildFromGithubLogin}
                    style={{textDecoration: 'none', color: "inherit"}}>
                <i className="large github middle aligned icon" /> Build From Github
              </Link>
              <br /><br />

              <div className="ui padded">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book.
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui blue fluid segment">

              <Link className="ui ribbon label raised fluid padded text container segment" to={this.props.login ? '/ngh/user' : '/'}
                    onClick={this.useLocalDeploymentLogin}
                    style={{textDecoration: 'none', color: "inherit"}}>
                <i className="large rocket middle aligned icon" /> Use Own Deployment
              </Link>
              <br /><br />

              <div className="ui padded">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book.
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  loginactions: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

