package com.harusora.student.controller;

import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.model.UserModel;
import com.harusora.student.request.ClassModelRequest;
import com.harusora.student.request.LoginRequest;
import com.harusora.student.request.UserCourseClassRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
//@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Slf4j
public class authenController {

    private final AuthService authService;

    @PostMapping("/register")
    public BaseResponse<?> registerAdmin(
            @PathVariable("id") int id,
            @RequestBody UserModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(authService.registerAdmin(request));
        } catch (Exception e) {
            log.debug("error create class", e);
            String message = e.getMessage();
            if(request == null) {
                message = "Form not null";
            }
            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }

    @PostMapping("/login")
    public BaseResponse<?> login(
            @RequestBody LoginRequest request

    ) {
        try {
            return BaseResponse.ofSucceeded(authService.login(request));
        } catch (Exception e) {
            log.debug("error update user", e);
            String message = e.getMessage();
            if(request == null) {
                message = "Form not null";
            }
            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }

	@PutMapping("/profile/{id}")
    public BaseResponse<?> update(
            @PathVariable("id")int id,
            @RequestBody UserModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(authService.updateProfile(id, request));
        } catch (Exception e) {
            log.debug("error update user", e);
            String message = e.getMessage();
            if(request == null) {
                message = "Form not null";
            }
            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }

    @GetMapping("profile/{id}")
    public BaseResponse<?> getProfile(
            @PathVariable("id")int id
            ) {
        try {

            var response = authService.profile(id);
            return BaseResponse.ofSucceeded(response);
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }
}
