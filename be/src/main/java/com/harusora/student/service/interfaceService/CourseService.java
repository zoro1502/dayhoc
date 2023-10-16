package com.harusora.student.service.interfaceService;

import com.harusora.student.model.CourseModel;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.security.common.BaseResponse;

import java.util.List;

public interface CourseService {
    CourseReponse create(CourseModelRequest courseDto);
    List<CourseReponse> findAll(String page, String page_size, String code, String course_id);
    CourseReponse findOne(int id);

    CourseReponse update(int id, CourseModelRequest courseDto);

    void deleteById(int id);

    BaseResponse.Metadata countByCondition(String page, String page_size, String code, String course_id);
}
