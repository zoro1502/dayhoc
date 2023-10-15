package com.harusora.student.controller;

import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.CourseService;
import com.harusora.student.service.interfaceService.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/courses")
//@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Slf4j
public class CourseController {
    private final CourseService courseService;

    @PostMapping()
    public BaseResponse<?> create(
            @RequestBody CourseModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(courseService.create(request));
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
            @RequestBody CourseModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(courseService.update(id,request));
        } catch (Exception e) {
            log.debug("error update user", e);
            String message = e.getMessage();
            if(request == null) {
                message = "Form not null";
            }
            BusinessErrorCode error = new BusinessErrorCode(400,  message,"", 400);
            return BaseResponse.ofFailed(error);
        }
    }

    @GetMapping()
    public BaseResponse<?> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "page_size", required = false, defaultValue = "20") int page_size,
            @RequestParam(name = "email", required = false, defaultValue = "") String email,
            @RequestParam(name = "phone", required = false, defaultValue = "") String phone,
            @RequestParam(name = "status", required = false, defaultValue = "") int status,
            @RequestParam(name = "role", required = false, defaultValue = "") int role

    ) {
        try {
//            var response = courseService.findAll(page, page_size, email, phone, status, role);
//            return BaseResponse.ofSucceeded(response);
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            BusinessErrorCode error = new BusinessErrorCode(400,  message,"", 400);
            return BaseResponse.ofFailed(error);
        }
        return null;
    }

    @GetMapping("/{id}")
    public BaseResponse<?> findOne(
            @PathVariable("id") int id
//            @RequestBody UserModelRequest request
    ) {
        try {
//            return BaseResponse.ofSucceeded(courseService.create(request));
            return null;
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            BusinessErrorCode error = new BusinessErrorCode(400,  message,message, 400);
            return BaseResponse.ofFailed(error);
        }
    }
}
