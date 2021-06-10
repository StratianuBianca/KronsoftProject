package ro.kronsoft.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.kronsoft.models.Admin;
import ro.kronsoft.repository.AdminRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(int id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (adminRepository.existsById(id)) {
            return adminRepository.getById(id);
        }
        return null;
    }
    public Admin createAdmin(Admin admin){
        admin=adminRepository.save(admin);
        return admin;
    }
    public boolean deleteAdmin(int id){
        Optional<Admin> availableAdmin=adminRepository.findById(id);
        if(availableAdmin.isPresent()){
            Admin admin=availableAdmin.get();
            adminRepository.delete(admin);
            return true;
        }
        return false;
    }
    public Admin updateAdmin(Admin admin){
        Optional<Admin> newAdmin=adminRepository.findById(admin.getAdminId());
        if(newAdmin.isPresent()){
            Admin updateAdmin= newAdmin.get();
            updateAdmin.setAdminId(admin.getAdminId());
            updateAdmin.setName(admin.getName());
            updateAdmin.setPassword(admin.getPassword());
            admin=adminRepository.save(updateAdmin);
            return admin;
        }
        return null;
    }

}
