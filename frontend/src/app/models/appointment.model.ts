export class AppointmentModel {
    appointmentId: number;
    description: string;
    status: string;
    patientId:number;
    type:string;
    startTime: string;
    endTime: string;

    constructor(id: number, description: string, status:string, patientId:number, type:string, startTime:string, endTime:string) {
      this.appointmentId = id;
      this.description = description;
      this.status = status;
      this.patientId=patientId;
      this.startTime=startTime;
      this.endTime=endTime;
      this.type=type;
    }
  
  }