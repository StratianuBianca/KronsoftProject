export class PatientModel {
    patientId: number;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    phoneNumber:number;
    sex:string;
    birthDate: Date;

    constructor(id: number, firstName: string, lastName:string, city: string, country:string, phoneNumber:number, sex:string, birtDate:Date) {
      this.patientId = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.city=city;
      this.country=country;
      this.phoneNumber=phoneNumber;
      this.birthDate=birtDate;
      this.sex=sex;
    }
  
  }