class User {
  UserId: number;
  Name: string;
  Username: string;
  Email: string;
  PasswordHash: string;
  Salt: string;
  constructor(
    UserId: any,
    Name: any,
    Username: any,
    Email: any,
    PasswordHash: any,
    Salt: any
  ) {
    this.UserId = UserId;
    this.Name = Name;
    this.Username = Username;
    this.Email = Email;
    this.PasswordHash = PasswordHash;
    this.Salt = Salt;
  }
}
