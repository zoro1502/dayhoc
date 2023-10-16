package com.harusora.student.service.interfaceService;

import com.harusora.student.model.CourseModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.request.StudentExerciseRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.ExerciseReponse;
import com.harusora.student.response.StudentExReponse;
import com.harusora.student.response.StudentExerciseResponse;
import com.harusora.student.security.common.BaseResponse;

import java.util.List;

public interface ExerciseService {
    ExerciseReponse create (ExerciseModelRequest exDto);
    List<ExerciseReponse> findAll(String page, String page_size, String title, String status, String class_id,String user_id);
    List<StudentExReponse> findStudentEx(String page, String page_size, String title, String status, String class_id, String user_id);


    ExerciseReponse findOne(int id);

    void deleteById(int id);

    ExerciseReponse update(int id, ExerciseModelRequest exDto);

    StudentExerciseResponse submit (int id, StudentExerciseRequest exDto);

    BaseResponse.Metadata countByCondition(String page, String page_size, String title, String status, String class_id,String user_id);
}
