package com.harusora.student.service.impl;

import com.harusora.student.model.*;
import com.harusora.student.repository.*;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.request.StudentExerciseRequest;
import com.harusora.student.response.*;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.ExerciseService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.Integer.parseInt;

@Service
@AllArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseModelRepository exerciseRepo;
    private final ClassModelRepository classRepo;
    private final StudentHasExModelRepository studentExRepo;
    private final UserModelRepository userRepo;
    private final Logger log = LoggerFactory.getLogger(ExerciseServiceImpl.class);
    @Override
    public ExerciseReponse create(ExerciseModelRequest exDto) {
        try {
            ExerciseModel exercise = new ExerciseModel();
            exercise.setClass_id(exDto.getClass_id());
            exercise.setCreated_at(new Date());
            exercise.setContent(exDto.getContent());
            exercise.setFile(exDto.getFile());

            exercise.setDeadline(exDto.getDeadline());
            exercise.setContent(exDto.getContent());
            exercise.setType(exDto.getType());
            exercise.setUser_id(exDto.getUser_id());
            exercise.setStatus(1);

            var save = exerciseRepo.save(exercise);
            ExerciseReponse response = new ExerciseReponse(Optional.of(save), null);
            return response;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<ExerciseReponse> findAll(String page, String page_size, String title, String class_id, String status, String user_id) {
        List<ExerciseModel> data = exerciseRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size),title
        );
//                , status, class_id, user_id

        List<ExerciseReponse> response = new ArrayList<>();
        if(!data.isEmpty()) {
            for(ExerciseModel item : data) {
                ExerciseReponse itemRes = new ExerciseReponse();
                Optional<UserModel> classRe = userRepo.findById(item.getUser_id());
                itemRes.setExercise(Optional.of(item));
                itemRes.setTeacher(classRe);
                response.add(itemRes);
            }
        }
        return response;
    }

    @Override
    public List<StudentExResponse> findStudentEx(String page, String page_size, String title, String class_id, String status, String user_id) {
        List<IStudentExResponse> data = studentExRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size), title
//                , status, class_id, user_id
        );
        List<StudentExResponse> response = new ArrayList<>();

        if(!data.isEmpty()) {
            for (IStudentExResponse item: data) {
//                log.debug("id ex-----------> " + item.);
                StudentExResponse itemRes = new StudentExResponse();

                itemRes.setId(item.getId());

                itemRes.setExercise_id(item.getExercise_id());
                itemRes.setTitle(item.getTitle());
                itemRes.setExercise_status(item.getExercise_status());

                itemRes.setAnswer(item.getAnswer());
                itemRes.setQuestion(item.getQuestion());

                itemRes.setClass_code(item.getClass_code());
                itemRes.setClass_name(item.getClass_name());

                itemRes.setStudent_name(item.getStudent_name());
                itemRes.setStudent_email(item.getStudent_email());
                itemRes.setStudent_id(item.getStudent_id());

                itemRes.setTeacher_id(item.getTeacher_id());
                itemRes.setTeacher_email(item.getTeacher_email());
                itemRes.setTeacher_name(item.getTeacher_name());

                itemRes.setExercise_created_at(item.getExercise_created_at());

                itemRes.setDeadline(item.getDeadline());
                itemRes.setMark(item.getMark());
                itemRes.setCreated_at(item.getCreated_at());


                response.add(itemRes);
            }
        }
        return response;
    }

    @Override
    public ExerciseReponse findOne(int id) {
        ExerciseReponse itemRes = new ExerciseReponse();
        Optional<ExerciseModel> ex = exerciseRepo.findById(id);
        if(!ex.isEmpty()) {
            Optional<UserModel> classRe = userRepo.findById(ex.get().getUser_id());
            itemRes.setTeacher(classRe);
        }
        itemRes.setExercise(ex);
        return itemRes;
    }

    @Override
    public void deleteById(int id) {
        exerciseRepo.deleteById(id);
    }

    @Override
    public ExerciseReponse update(int id, ExerciseModelRequest exDto) {
        ExerciseModel exercise = exerciseRepo.findById(id).get();
        if(exercise == null) {
            throw new RuntimeException("Không tìm thấy bài tập tương ứng");
        }
        exercise.setContent(exDto.getContent());
        exercise.setFile(exDto.getFile());
        exercise.setTitle(exDto.getTitle());
        exercise.setDeadline(exDto.getDeadline());
        exercise.setStatus(exDto.getStatus());
        var response = exerciseRepo.save(exercise);
        return new ExerciseReponse(Optional.of(response), null);
    }

    @Override
    public StudentExerciseResponse submit(int id, StudentExerciseRequest exDto) {
        Optional<ExerciseModel> exercise = exerciseRepo.findById(id);
        if(exDto.getStudent_id() != null) {
            Optional<UserModel> userDto = userRepo.findById(exDto.getStudent_id());
            if(userDto.isEmpty() || (!userDto.isEmpty() && userDto.get().getRole() != 3)) {
                throw new RuntimeException("Không tìm thấy student tương ứng");
            }
        }

        if(exercise.isEmpty()) {
            throw new RuntimeException("Không tìm thấy bài tập tương ứng");
        }


        Optional<ClassModel> classroomDto = classRepo.findById(exercise.get().getClass_id());
        if(classroomDto.isEmpty() || (!classroomDto.isEmpty() && classroomDto.get().getStatus() != 1)) {
            throw new RuntimeException("Không tìm thấy lớp học tương ứng hoặc lớp học không hoạt động");
        }
        // TH học sinh nộp bài
        if(exDto.getFile() != null) {
            if(exercise.get().getDeadline().before(new Date())) {
                throw new RuntimeException("Quá hạn nộp bài");
            }
            if(exercise.get().getStatus() != 1) {
                throw new RuntimeException("Bài tập đã đóng, không thể nộp");
            }
        }
        StudentHasExModel studentEx = studentExRepo.findOneByCondition(exDto.getStudent_id().toString(), id + "");
        if(studentEx != null) {
            if(exDto.getMark() != null) {
                studentEx.setMark(exDto.getMark());
            }
            if(exDto.getFile() != null) {
                studentEx.setFile(exDto.getFile());
            }
            studentEx.setUpdated_at(new Date());
            studentEx.setClass_id(exercise.get().getClass_id());

        } else {
            if(exDto.getFile() == null) {
                throw new RuntimeException("Vui lòng chịn file đáp án của bạn");
            }
            studentEx = new StudentHasExModel();
            studentEx.setExercise_id(exercise.get().getId());
            studentEx.setStudent_id(exDto.getStudent_id());
            studentEx.setMark((double) 0);
            studentEx.setFile(exDto.getFile());
            studentEx.setClass_id(exercise.get().getClass_id());
            studentEx.setCreated_at(new Date());
        }
        var response = studentExRepo.save(studentEx);
        if(response != null) {
            Optional<UserModel> user = userRepo.findById(exDto.getStudent_id());
            Optional<ClassModel> classroom = classRepo.findById(exercise.get().getClass_id());
            if(!user.isEmpty()) {
                return new StudentExerciseResponse(
                        response.getId(), response.getExercise_id(),
                        response.getStudent_id(), response.getClass_id(), response.getMark(),
                        response.getCreated_at(), response.getUpdated_at(), exercise.get(),
                        user.get(), classroom.get()
                );
            } else {
                return new StudentExerciseResponse(
                        response.getId(), response.getExercise_id(),
                        response.getStudent_id(), response.getClass_id(), response.getMark(),
                        response.getCreated_at(), response.getUpdated_at(), null, null, null
                );
            }
        } else {
            throw new RuntimeException("Có lỗi xảy ra");

        }
    }

    @Override
    public BaseResponse.Metadata countByCondition(String page, String page_size, String title, String class_id, String status, String user_id) {
        long total = (long) exerciseRepo.count(title
//                , status,  class_id,  user_id
        );
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }

    @Override
    public BaseResponse.Metadata countStudentEx(String page, String page_size, String title, String status, String class_id, String user_id) {
        long total = (long) studentExRepo.count(title
//                , status,  class_id,  user_id
        );
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }
}
