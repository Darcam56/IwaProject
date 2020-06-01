package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.iwaproject.message.request.LoginForm;
import com.example.iwaproject.message.request.SignUpForm;
import com.example.iwaproject.message.response.JwtResponse;
import com.example.iwaproject.message.response.ResponseMessage;
import com.example.iwaproject.repositories.RoleRepository;
import com.example.iwaproject.repositories.UserRepository;
import com.example.iwaproject.security.jwt.JwtProvider;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/auth")
public class AuthRESTController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) ((org.springframework.security.core.Authentication) authentication).getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt,userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignUpForm signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken."), HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getUsername(), passwordEncoder.encode(signUpRequest.getPassword()));
        Set<String> strRoles = signUpRequest.getRole();
        user.setRoles(getRoles(strRoles));
        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully."), HttpStatus.OK);
    }

    @PostMapping("/signup/spec")
    public ResponseEntity<?> registerFestGoer(@Valid @RequestBody SignUpForm signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken."), HttpStatus.BAD_REQUEST);
        }

        FestGoer user =  new FestGoer(signUpRequest.getUsername(), passwordEncoder.encode(signUpRequest.getPassword()),
                                      signUpRequest.getFirstname(), signUpRequest.getLastname());
        Set<String> strRoles = signUpRequest.getRole();
        user.setRoles(getRoles(strRoles));
        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully."), HttpStatus.OK);
    }

    @PostMapping("/signup/band")
    public ResponseEntity<?> registerBand(@Valid @RequestBody SignUpForm signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken."), HttpStatus.BAD_REQUEST);
        }

        Band user =  new Band(signUpRequest.getUsername(), passwordEncoder.encode(signUpRequest.getPassword()),
                              signUpRequest.getName(), signUpRequest.getMusicType(), signUpRequest.getDescription());

        Set<String> strRoles = signUpRequest.getRole();
        user.setRoles(getRoles(strRoles));
        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully."), HttpStatus.OK);
    }

    private Set<Role> getRoles(Set<String> strRoles){
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
                case "admin":
                    Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Fail -> Cause: Admin Role not found."));
                    roles.add(adminRole);
                    break;
                case "spec":
                    Role specRole = roleRepository.findByName(RoleName.ROLE_SPEC)
                            .orElseThrow(() -> new RuntimeException("Fail -> Cause: User Role not found."));
                    roles.add(specRole);
                    break;
                case "org":
                    Role orgRole = roleRepository.findByName(RoleName.ROLE_ORG)
                            .orElseThrow(() -> new RuntimeException("Fail -> Cause: User Role not found."));
                    roles.add(orgRole);
                    break;
                case "band":
                    Role bandRole = roleRepository.findByName(RoleName.ROLE_BAND)
                            .orElseThrow(() -> new RuntimeException("Fail -> Cause: User Role not found."));
                    roles.add(bandRole);
                    break;
            }
        });
        return roles;
    }

}
