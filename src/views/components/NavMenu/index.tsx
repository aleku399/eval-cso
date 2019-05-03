import React, { Component } from "react";
import { Menu, SemanticWIDTHS } from "semantic-ui-react";

export interface MenuItem {
  name: string;
  id: string;
}

export type Alignment = "vertical" | "horizontal";

export const vertical: Alignment = "vertical";
export const horizontal: Alignment = "horizontal";

export type SetActiveMenuItem = (val: string) => void;

export interface Props {
  items: MenuItem[];
  header?: string;
  widths?: SemanticWIDTHS;
  alignment?: Alignment;
  activeItem: string;
  setActiveMenuItem: SetActiveMenuItem;
}

interface State {
  items: MenuItem[];
  activeItem: string;
}

class NavMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      items: this.props.items,
      activeItem: this.props.activeItem
    };
  }

  public handleItemClick = (_e, { value }) => {
    this.setState({ activeItem: value });
    this.props.setActiveMenuItem(value);
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
    }
  }

  public render() {
    const { activeItem, items } = this.state;
    const { alignment, header, widths } = this.props;
    return (
      <Menu vertical={vertical === alignment} fluid={true} widths={widths}>
        {header ? (
          <Menu.Item>
            <Menu.Header>{header}</Menu.Header>
          </Menu.Item>
        ) : null}
        {items.map(item => (
          <Menu.Item
            name={item.name}
            key={item.id}
            value={item.id}
            active={activeItem === item.id}
            onClick={this.handleItemClick}
          />
        ))}
      </Menu>
    );
  }
}

export default NavMenu;
