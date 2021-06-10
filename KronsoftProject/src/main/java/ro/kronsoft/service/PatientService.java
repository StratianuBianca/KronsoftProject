package ro.kronsoft.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.kronsoft.models.Patient;
import ro.kronsoft.repository.PatientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatient(){
        return patientRepository.findAll();
    }
    public Patient getPatientById(int id){
        if(patientRepository.existsById(id)){
            return patientRepository.getById(id);
        }
        return null;
    }
    public Patient createPatient(Patient patient){
       patient= patientRepository.save(patient);
        return patient;
    }
    public boolean deletePatient(int id){
        Optional<Patient> patient=patientRepository.findById(id);
        if(patient.isPresent()){
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
