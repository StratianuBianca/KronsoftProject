package ro.kronsoft.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import ro.kronsoft.models.Patient;
import ro.kronsoft.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("api/v1/patient")
@Api(value = "Patient Controller")
public class PatientController {
    @Autowired
    private PatientService service;

    @ApiOperation(value = "Return all patients")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Patient not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @GetMapping("/all")
    public ResponseEntity<List<Patient>> getPatients() {
        List<Patient> patients = service.getAllPatient();
        if (patients.isEmpty()) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(patients, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Return patient by id")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Patient not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @GetMapping()
    public ResponseEntity<Patient> getPatient(@RequestParam int id) {
        Patient patient = service.getPatientById(id);
        if (patient == null) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(patient, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Post admin")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 400, message = "Bad request"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @PostMapping("/create")
    public ResponseEntity<Patient> postPatient(@RequestBody Patient patient) {
        Patient newPatient = service.createPatient(patient);
        if (newPatient == null) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(newPatient, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Update patient")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @PutMapping("/update")
    public ResponseEntity<Patient> updateAdmin(@RequestBody Patient patient) {
        Patient updatePatient = service.updatePatient(patient);
        if (updatePatient == null) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatePatient, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Delete patient")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Not found"),
                    @ApiResponse(code = 204, message = "No content")
            }
    )
    @DeleteMapping("/delete/{patientId}")
    public ResponseEntity<String> deletePatient(@PathVariable int patientId) {
        if (service.deletePatient(patientId)) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NOT_FOUND);
    }


}

