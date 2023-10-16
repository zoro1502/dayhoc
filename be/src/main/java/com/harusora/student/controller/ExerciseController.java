package com.harusora.student.controller;

import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.request.StudentExerciseRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.ExerciseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/exercises")
//@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Slf4j
public class ExerciseController {
    private final ExerciseService exerciseService;

    @PostMapping()
    public BaseResponse<?> create(
            @RequestBody ExerciseModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(exerciseService.create(request));
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
            @RequestBody ExerciseModelRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(exerciseService.update(id,request));
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

    @PostMapping("submit/{id}")
    public BaseResponse<?> submitOrCheckPoint(
            @PathVariable("id") int id,
            @RequestBody StudentExerciseRequest request
    ) {
        try {
            return BaseResponse.ofSucceeded(exerciseService.submit(id, request));
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

    @GetMapping()
    public BaseResponse<?> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "1") String page,
            @RequestParam(name = "page_size", required = false, defaultValue = "20") String page_size,
            @RequestParam(name = "title", required = false, defaultValue = "") String title

    ) {
        try {
            var response = exerciseService.findAll(page, page_size, title);
            var paging = exerciseService.countByCondition(page, page_size, title);
            return BaseResponse.ofSucceeded(response).setMeta(paging);
        } catch (Exception e) {
            log.debug("error create user", e);
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
            return BaseResponse.ofSucceeded(exerciseService.findOne(id).getResult());
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400,  message,message, 400));
            return BaseResponse.ofFailed(error);
        }
    }

    @DeleteMapping("/{id}")
    public BaseResponse<?> deleteById(
            @PathVariable("id") int id
    ) {
        try {
            exerciseService.deleteById(id);
            return BaseResponse.ofSucceeded(exerciseService.findOne(id).getResult());
        } catch (Exception e) {
            log.debug("error create user", e);
            String message = e.getMessage();

            var error = new BusinessException(new BusinessErrorCode(400, message, message, 400));
            log.error("error create class obj", error);
            return BaseResponse.ofFailed(error);
        }
    }
}
