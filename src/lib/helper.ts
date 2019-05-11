import { DropdownItemProps } from "semantic-ui-react";
import { Profile } from "../views/components/UserProfile";

export function mkOptionsFromUser(users: Profile[]): DropdownItemProps[] {
  return users.map(user => ({
    key: user.userName,
    value: user.userName,
    text: user.fullName
  }));
}

export function getFormattedDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();

  const month = 1 + date.getMonth();
  const formattedMonth = month > 9 ? month : `0${month}`;

  const day = date.getDate();
  const formattedDay = day > 9 ? day : `0${day}`;

  return formattedMonth + "/" + formattedDay + "/" + year;
}
