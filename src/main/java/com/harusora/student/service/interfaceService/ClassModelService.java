package com.harusora.student.service.interfaceService;

import com.harusora.student.request.ClassModelRequest;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.response.ClassModelReponse;
import com.harusora.student.response.CourseReponse;

import java.util.List;

public interface ClassModelService {
    ClassModelReponse create(ClassModelRequest classDto);
    List<ClassModelReponse> findAll(int page, int page_size, String code, int course_id);
    ClassModelReponse findOne(int id);

    ClassModelReponse update(int id, ClassModelRequest classDto);
}
