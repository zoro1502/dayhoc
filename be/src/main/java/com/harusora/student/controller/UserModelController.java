package com.harusora.student.controller;

import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/users")
//@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Slf4j
public class UserModelController {

    private final UserModelService userService;

    @PostMapping()
    public BaseResponse<?> create(
            @RequestBody UserModelRequest request
    ) {
       try {
           return BaseResponse.ofSucceeded(userService.create(request));
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

    @PutMapping("/{id}")
    public BaseResponse<?> update(
            @PathVariable("id") int id,
            @RequestBody UserModelRequest request
    ) {
        try {
            var response = BaseResponse.ofSucceeded(userService.update(id,request));
            log.info("info--------> ", response);
            return response;

        } catch (Exception e) {
            log.debug("error update user", e);
            String message = e.getMessage();
            if(request == null) {
                message = "Form not null";
            }
            var error = new BusinessException(new BusinessErrorCode(400,  message,message, 400));
            return BaseResponse.ofFailed(error);
        }
    }

    @GetMapping("")
    public BaseResponse<?> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "1") String page,
            @RequestParam(name = "page_size", required = false, defaultValue = "20") String page_size,
            @RequestParam(name = "email", required = false, defaultValue = "") String email,
            @RequestParam(name = "phone", required = false, defaultValue = "") String phone,
            @RequestParam(name = "status", required = false, defaultValue = "") String status,
            @RequestParam(name = "role", required = false, defaultValue = "") String role
    ) {
        try {
            var response = userService.findAll(page, page_size, email, phone, status, role);
            var paging = userService.countByCondition(page, page_size, email, phone, status, role);
            return BaseResponse.ofSucceeded(response).setMeta(paging);
        } catch (Exception e) {
            log.error("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400,  message,message, 400));
            return BaseResponse.ofFailed(error);
        }
    }

    @GetMapping("/{id}")
    public BaseResponse<?> findOne(
            @PathVariable("id") int id
    ) {
        try {
            return BaseResponse.ofSucceeded(userService.findOne(id).getResult());
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400,  message,message, 400));
            return BaseResponse.ofFailed(error);
        }
    }
}
