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
import ro.kronsoft.models.Admin;
import ro.kronsoft.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@Api(value = "Admin Controller")
public class AdminController {
    @Autowired
    private AdminService service;

    @ApiOperation(value = "Return all admins")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Admin not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAdmins() {
        List<Admin> admins = service.getAllAdmin();
        if (admins.isEmpty()) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admins, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Return admin by id")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Admin not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @GetMapping()
    public ResponseEntity<Admin> getAdmin(@RequestParam int id) {
        Admin admin = service.getAdminById(id);
        if (admin == null) {

            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admin, new HttpHeaders(), HttpStatus.OK);
    }

    @ApiOperation(value = "Post admin")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 400, message = "Bad request"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @PostMapping("/create")
    public ResponseEntity<Admin> postAdmin(@RequestBody Admin admin) {
        Admin newAdmin = service.createAdmin(admin);
        if (newAdmin == null) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(newAdmin, new HttpHeaders(), HttpStatus.OK);
    }
    @ApiOperation(value = "Update admin")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Not found"),
                    @ApiResponse(code = 200, message = "Successful")
            }
    )
    @PutMapping("/update")
    public ResponseEntity<Admin> updateAdmin(@RequestBody Admin admin){
        Admin updateAdmin= service.updateAdmin(admin);
        if (updateAdmin == null) {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updateAdmin, new HttpHeaders(), HttpStatus.OK);
    }
    @ApiOperation(value = "Delete admin")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 404, message = "Not found"),
                    @ApiResponse(code = 204, message = "No content")
            }
    )
    @DeleteMapping("/delete/{adminId}")
    public ResponseEntity<String> deleteAdmin(@PathVariable int adminId){
        if(service.deleteAdmin(adminId)){
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NOT_FOUND);
    }


}
