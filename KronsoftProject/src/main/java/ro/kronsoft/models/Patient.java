package ro.kronsoft.models;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Setter
@Getter
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int patientId;
    private String firstName;
    private String lastName;
    private Date  birthDate;
    private String sex;
    private String city;
    private String country;
    private int phoneNumber;
}
