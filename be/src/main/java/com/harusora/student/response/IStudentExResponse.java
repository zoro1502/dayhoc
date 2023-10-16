package com.harusora.student.response;

import java.util.Date;

public interface IStudentExResponse {
     Integer getId();
    String getTitle();
    Integer getExercise_status();
    String getTeacher_name();
     String getQuestion();
     String getAnswer();
     String getStudent_email();
    String getStudent_name();
    String getClass_name();
    String getClass_code();
    String getTeacher_email();
    Integer getStudent_id();
    Integer getTeacher_id();
    Integer getExercise_id();
    Double getMark();
    Date getDeadline();
    Date getCreated_at();
    Date getExercise_created_at();
}
