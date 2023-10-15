package com.harusora.student.service.interfaceService;

import com.harusora.student.model.ClassModel;
import com.harusora.student.request.ClassModelRequest;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.response.ClassModelReponse;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.security.common.BaseResponse;

import java.util.List;

public interface ClassModelService {
    ClassModel create(ClassModelRequest classDto);
    List<ClassModel> findAll(String page, String page_size, String code, String course_id);
    ClassModelReponse findOne(int id);

    ClassModel update(int id, ClassModelRequest classDto);
    void deleteById(int id);

    BaseResponse.Metadata countByCondition(String page, String page_size, String code, String course_id);
}
