import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const NewIcon = styled(Icon)`
  margin: 0px !important;
`;
const NewMenu = styled(Menu)`
  margin: 0px !important;
`;
const NewMenuItem = styled(Menu.Item)`
  margin: 0px !important;
`;

export default class TopMenu extends Component {
  handleActiveItem = (e, { name }) => {
    this.props.onActiveItemClick(name);
  }
  handleLogOut = (e, { name }) => {
    this.props.onLogOutClick(e, { name });
  };
  render() {
    const { activeItem, logOut } = this.props;
    if (logOut) {
      return (
        <Redirect to="/login" />
      );
    }
    return (
      <NewMenu color="blue" inverted secondary >
        <NewMenuItem name="home" active={activeItem === 'home'} onClick={this.handleActiveItem}>
          <Link to="/">
            <NewIcon name="home" size="big" />
          </Link>
        </NewMenuItem>
        <Menu.Menu position="right">
          <NewMenuItem name="mypage" active={activeItem === 'mypage'} onClick={this.handleActiveItem}>
            <Link to="/mypage">
              <NewIcon name="user" size="big" />
            </Link>
          </NewMenuItem>
          <NewMenuItem name="logout" active={activeItem === 'logout'} onClick={this.handleLogOut}>
            <NewIcon name="sign out" size="big" />
          </NewMenuItem>
        </Menu.Menu>
      </NewMenu>
    );
  }
}
