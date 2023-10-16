package com.harusora.student.service.impl;

import com.harusora.student.model.*;
import com.harusora.student.repository.*;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.request.StudentExerciseRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.ExerciseReponse;
import com.harusora.student.response.StudentExerciseResponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.ExerciseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
            ExerciseReponse response = new ExerciseReponse(Optional.of(save));
            return response;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<ExerciseModel> findAll(String page, String page_size, String title) {
        List<ExerciseModel> data = exerciseRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size), title);

        return data;
    }

    @Override
    public ExerciseReponse findOne(int id) {
        return new ExerciseReponse(exerciseRepo.findById(id));
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
        return new ExerciseReponse(Optional.of(response));
    }

    @Override
    public StudentExerciseResponse submit(int id, StudentExerciseRequest exDto) {
        Optional<ExerciseModel> exercise = exerciseRepo.findById(id);
        if(exercise.isEmpty()) {
            throw new RuntimeException("Không tìm thấy bài tập tương ứng");
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
            if(exDto.getFile() != null) {
                throw new RuntimeException("Vui lòng chịn file đáp án của bạn");
            }
            studentEx = new StudentHasExModel();
            studentEx.setExercise_id(exercise.get().getId());
            studentEx.setStudent_id(exDto.getStudent_id());
            studentEx.setMark((double) 0);
            studentEx.setFile(exDto.getFile());
            studentEx.setClass_id(exDto.getClass_id());
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
    public BaseResponse.Metadata countByCondition(String page, String page_size, String title) {
        long total = (long) exerciseRepo.count(title);
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }
}
