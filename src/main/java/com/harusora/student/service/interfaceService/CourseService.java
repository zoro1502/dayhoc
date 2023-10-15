package com.harusora.student.service.interfaceService;

import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.UserModelResponse;

import java.util.List;

public interface CourseService {
    CourseReponse create(CourseModelRequest courseDto);
    List<CourseReponse> findAll(int page, int page_size, String code, int course_id);
    CourseReponse findOne(int id);

    CourseReponse update(int id, CourseModelRequest courseDto);
}
