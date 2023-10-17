package com.harusora.student.service.impl;

import com.harusora.student.model.UserModel;
import com.harusora.student.repository.UserModelRepository;
import com.harusora.student.request.LoginRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.LoginResponse;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.security.auth.AuthenticationResponse;
import com.harusora.student.security.config.JwtService;
import com.harusora.student.service.interfaceService.AuthService;
import com.harusora.student.service.interfaceService.UserModelService;
import com.harusora.student.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class AuthenServiceImpl implements AuthService {

    private final UserModelRepository userRepo;

    private final UserModelService userService;

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public UserModelResponse registerAdmin(UserModelRequest userDto) {
        return userService.create(userDto);
//        if(user)
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        log.debug("email=====> " + request.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        log.debug("token=========> " + jwtToken);

        return new LoginResponse(jwtToken, refreshToken, user);
    }

    @Override
    public UserModelResponse profile(int id) {
       return userService.findOne(id);
    }

    @Override
    public UserModelResponse updateProfile(int id, UserModelRequest userDto) {
        return null;
//        return userService.update(id, userDto);
    }
}
