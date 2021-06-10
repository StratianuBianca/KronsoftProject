package ro.kronsoft.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Setter
@Getter
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int appointmentId;
    private int patientId;
    private String type;
    private String status;
    private Date startTime;
    private Date endTime;
    private String description;
}
