import React, { Component } from 'react';
import { Button, Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export default class TopMenu extends Component {
  render() {
    return (
      <Menu color='blue' inverted secondary >
        <Menu.Item>
          <Icon name='home' size='big' />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button inverted>MyPage</Button>
          </Menu.Item>
          <Menu.Item>
            <Button inverted>Log-out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
