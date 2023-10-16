package com.harusora.student.controller;

import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.request.ClassModelRequest;
import com.harusora.student.request.UserCourseClassRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.ClassModelService;
import com.harusora.student.service.interfaceService.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/classrooms")
//@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Slf4j
public class ClassStudentController {
    private final ClassModelService classModelService;

    @PostMapping()
    public BaseResponse<?> create(
            @RequestBody ClassModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(classModelService.create(request));
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

    @PostMapping("/join/{id}")
    public BaseResponse<?> studentJoinClass(
            @PathVariable("id") int id,
            @RequestBody UserCourseClassRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(classModelService.joinClass(request));
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
            @RequestBody ClassModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(classModelService.update(id,request));
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

    @GetMapping()
    public BaseResponse<?> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "1") String page,
            @RequestParam(name = "page_size", required = false, defaultValue = "20") String page_size,
            @RequestParam(name = "code", required = false, defaultValue = "") String code,
            @RequestParam(name = "course_id", required = false, defaultValue = "") String course_id

    ) {
        try {
            var response = classModelService.findAll(page, page_size, code, course_id);
            var paging = classModelService.countByCondition(page, page_size, code, course_id);
            return BaseResponse.ofSucceeded(response).setMeta(paging);
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }

    @GetMapping("/{id}")
    public BaseResponse<?> findOne(
            @PathVariable("id") int id
    ) {
        try {
            return BaseResponse.ofSucceeded(classModelService.findOne(id).getResult());
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }

    @DeleteMapping("/{id}")
    public BaseResponse<?> deleteById(
            @PathVariable("id") int id
    ) {
        try {
            classModelService.deleteById(id);
            return BaseResponse.ofSucceeded(classModelService.findOne(id).getResult());
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }
}
