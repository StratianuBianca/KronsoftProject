export class AppointmentModel {
    appointmentId: number;
    description: string;
    status: string;
    patientId:number;
    type:string;
    startTime: Date;
    endTime: Date;

    constructor(id: number, description: string, status:string, patientId:number, type:string, startTime:Date, endTime:Date) {
      this.appointmentId = id;
      this.description = description;
      this.status = status;
      this.patientId=patientId;
      this.startTime=startTime;
      this.endTime=endTime;
      this.type=type;
    }
  
  }