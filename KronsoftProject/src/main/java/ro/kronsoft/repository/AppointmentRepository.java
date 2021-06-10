package ro.kronsoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.kronsoft.models.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
}
