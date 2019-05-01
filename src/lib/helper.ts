import { DropdownItemProps } from "semantic-ui-react";
import { Profile } from "../views/components/UserProfile";

export function mkOptionsFromUser(users: Profile[]): DropdownItemProps[] {
  return users.map(user => ({
    key: user.userName,
    value: user.userName,
    text: user.fullName
  }));
}
