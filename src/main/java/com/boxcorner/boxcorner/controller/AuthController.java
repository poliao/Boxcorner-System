package com.boxcorner.boxcorner.controller;

import java.util.Collections;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boxcorner.boxcorner.config.CorsConfig;
import com.boxcorner.boxcorner.dto.LoginRequest;
import com.boxcorner.boxcorner.dto.RegisterRequest;
import com.boxcorner.boxcorner.entity.User;
import com.boxcorner.boxcorner.repository.UserRepository;
import com.boxcorner.boxcorner.security.jwt.JwtUtils;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = CorsConfig.FRONTEND_URL)
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtils jwtUtils;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. ให้ Spring Security ตรวจสอบ User/Pass
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), 
                    loginRequest.getPassword()
                )
            );

            // 2. ถ้าผ่าน ให้สร้าง Token
            String token = jwtUtils.generateToken(loginRequest.getUsername());
            
            // 3. ส่ง Token กลับไป
            return ResponseEntity.ok(Collections.singletonMap("token", token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // 1. เช็คก่อนว่า Username ซ้ำไหม
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // 2. สร้าง User ใหม่
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        
        // **จุดสำคัญที่สุด**: ต้องเข้ารหัส Password ก่อนบันทึก
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // 3. กำหนด Role (ถ้าไม่ส่งมา ให้เป็น User ธรรมดา)
       
        newUser.setRole("ROLE_USER");
    
        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully!");
    }
}