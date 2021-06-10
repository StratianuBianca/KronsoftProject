package ro.kronsoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.kronsoft.models.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
}
