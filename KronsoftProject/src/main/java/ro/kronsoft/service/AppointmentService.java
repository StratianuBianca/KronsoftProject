package ro.kronsoft.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.kronsoft.models.Appointment;
import ro.kronsoft.repository.AdminRepository;
import ro.kronsoft.repository.AppointmentRepository;
import ro.kronsoft.repository.PatientRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    public List<Appointment> getAllAppointments(){
        List<Appointment> appointments=appointmentRepository.findAll();
        if(appointments.isEmpty()){
            return new ArrayList<>();
        }
        return appointments;
    }

    public List<Appointment> getAppointmentByPatient(int patientId){
        List<Appointment> allAppointments=appointmentRepository.findAll();
        List<Appointment> appointmentsByPatient=new ArrayList<>();
        for(Appointment appointment:allAppointments){
            if(appointment.getPatientId()==patientId){
                appointmentsByPatient.add(appointment);
            }
        }
        if(!appointmentsByPatient.isEmpty()){
            return appointmentsByPatient;
        }
        return new ArrayList<>();
    }

    public Appointment createAppointment(Appointment appointment){
        int patientId=appointment.getPatientId();
        if(patientRepository.existsById(patientId)) {
            appointment = appointmentRepository.save(appointment);
            return appointment;
        }
        return null;
    }
    public boolean deleteAppointment(int id){
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public Appointment updateAppointment(Appointment appointment) {
        int id=appointment.getAppointmentId();
        Optional<Appointment> newAppointment=appointmentRepository.findById(id);
        if(newAppointment.isPresent()){
            Appointment updateAppointment= newAppointment.get();
            updateAppointment.setDescription(appointment.getDescription());
            updateAppointment.setEndTime(appointment.getEndTime());
            updateAppointment.setStartTime(appointment.getStartTime());
            updateAppointment.setAppointmentId(appointment.getAppointmentId());
            updateAppointment.setStatus(appointment.getStatus());
            appointment=appointmentRepository.save(updateAppointment);
            return appointment;
        }
        return null;
    }

}
