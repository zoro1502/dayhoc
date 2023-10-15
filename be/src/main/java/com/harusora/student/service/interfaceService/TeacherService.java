package com.harusora.student.service.interfaceService;

import com.harusora.student.request.CreateTeacherRequest;
import com.harusora.student.response.TeacherResponse;

public interface TeacherService {

    TeacherResponse create(CreateTeacherRequest createTeacherRequest);
}
