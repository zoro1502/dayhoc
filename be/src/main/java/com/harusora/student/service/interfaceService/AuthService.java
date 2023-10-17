package com.harusora.student.service.interfaceService;

import com.harusora.student.model.UserModel;
import com.harusora.student.request.LoginRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.LoginResponse;
import com.harusora.student.response.UserModelResponse;

public interface AuthService {

    UserModelResponse registerAdmin(UserModelRequest userDto) ;
    LoginResponse login(LoginRequest loginDto) ;
    UserModelResponse profile(int id);
    UserModelResponse updateProfile(int id,UserModelRequest userDto);
}
