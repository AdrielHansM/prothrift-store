interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  contactNumber: number;
  email: string;
  points: number;
  isLogged: boolean;
  isDeleted: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}

export default UserData;