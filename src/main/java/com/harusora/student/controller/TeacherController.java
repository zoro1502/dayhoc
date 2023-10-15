package com.harusora.student.controller;

import com.harusora.student.request.CreateTeacherRequest;
import com.harusora.student.response.TeacherResponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/teacher")
//@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping
    public BaseResponse<TeacherResponse> save(
            @RequestBody CreateTeacherRequest request
    ) {
       return BaseResponse.ofSucceeded(teacherService.create(request));
    }
}
