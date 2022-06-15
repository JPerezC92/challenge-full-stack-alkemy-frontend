interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
  }
}
