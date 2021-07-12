package ro.kronsoft.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.kronsoft.models.Appointment;
import ro.kronsoft.models.Patient;
import ro.kronsoft.repository.PatientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private AppointmentService appointmentService;

    public List<Patient> getAllPatient(){
        return patientRepository.findAll();
    }
    public Patient getPatientById(int id){
        if(patientRepository.existsById(id)){
            return patientRepository.getById(id);
        }
        return null;
    }
    public int getIdByPatientName(String patientFirstName, String patientLastName){
        int patientId = -1;
       // System.out.println("SDSD");
       // System.out.println(patientFirstName);
        List<Patient> allPatients=patientRepository.findAll();
        for(Patient patient:allPatients){
            if(patientFirstName.equals(patient.getLastName()) && patientLastName.equals(patient.getFirstName())){
                patientId=patient.getPatientId();
            }
        }
      //  System.out.println(patientId);
        return patientId;
    }
    public Patient createPatient(Patient patient){
       patient= patientRepository.save(patient);
        return patient;
    }
    public boolean deletePatient(int id){
        Optional<Patient> patient=patientRepository.findById(id);
        if(patient.isPresent()){
            List<Appointment> appointments;
            appointments=appointmentService.getAppointmentByPatient(id);
            for(Appointment appointment:appointments){
                appointmentService.deleteAppointment(appointment.getAppointmentId());
            }
            Patient deletePatient=patient.get();
            patientRepository.delete(deletePatient);
            return true;
        }
        return false;
    }
    public Patient updatePatient(Patient patient){
        Optional<Patient> newPatient=patientRepository.findById(patient.getPatientId());
        if(newPatient.isPresent()){
            Patient updatePatient=newPatient.get();
            updatePatient.setPatientId(patient.getPatientId());
            updatePatient.setBirthDate(patient.getBirthDate());
            updatePatient.setCity(patient.getCity());
            updatePatient.setCountry(patient.getCountry());
            updatePatient.setFirstName(patient.getFirstName());
            updatePatient.setLastName(patient.getLastName());
            updatePatient.setPhoneNumber(patient.getPhoneNumber());
            updatePatient.setSex(patient.getSex());
            patient=patientRepository.save(updatePatient);
            return patient;
        }
        return null;
    }
}
