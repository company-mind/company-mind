import React, { Component } from 'react';
import { Button, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TopMenu extends Component {
  handleLogOutButton = () => {
    this.props.onLogOutClick();
  };
  render() {
    return (
      <Menu color="blue" inverted secondary >
        <Menu.Item>
          <Link to="/">
            <Icon name="home" size="big" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/mypage">
              <Button inverted>MyPage</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Button inverted onClick={this.handleLogOutButton}>Log-out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
