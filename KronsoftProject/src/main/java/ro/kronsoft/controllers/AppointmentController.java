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
import ro.kronsoft.models.Appointment;
import ro.kronsoft.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("api/v1/appointment")
@Api(value = "Appointment Controller")
public class AppointmentController {
    @Autowired
    private AppointmentService service;

    @ApiOperation(value = "Return all appointments")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Appointment not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = service.getAllAppointments();
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(appointments, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Return appointments by patient id")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Appointments not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @GetMapping()
    public ResponseEntity<List<Appointment>> getAppointmentsByPatientId(@RequestParam int id) {
       List <Appointment> appointments = service.getAppointmentByPatient(id);
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(appointments, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Post appointments")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 400, message = "Bad request"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @PostMapping("/create")
    public ResponseEntity<Appointment> postAppointments(@RequestBody Appointment appointment) {
        Appointment newAppointment = service.createAppointment(appointment);
        if (newAppointment == null) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(newAppointment, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Update appointments")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @PutMapping("/update")
    public ResponseEntity<Appointment> updateAdmin(@RequestBody Appointment appointment) {
        Appointment updateAppointment = service.updateAppointment(appointment);
        if (updateAppointment == null) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updateAppointment, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Delete appointment")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Not found"),
                    @ApiResponse(code = 204, message = "No content")
            }
    )
    @DeleteMapping("/delete/{appointmentId}")
    public ResponseEntity<String> deleteAppointment(@PathVariable int appointmentId) {
        if (service.deleteAppointment(appointmentId)) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NOT_FOUND);
    }


}


