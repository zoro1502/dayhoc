package com.harusora.student.service.impl;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import com.harusora.student.model.UserCourseClassesModel;
import com.harusora.student.model.UserModel;
import com.harusora.student.repository.ClassModelRepository;
import com.harusora.student.repository.CourseModelRepository;
import com.harusora.student.repository.UserCourseClassesModelRepo;
import com.harusora.student.repository.UserModelRepository;
import com.harusora.student.request.ClassModelRequest;
import com.harusora.student.request.UserCourseClassRequest;
import com.harusora.student.response.ClassModelReponse;
import com.harusora.student.response.UserCourseClassReponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.ClassModelService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
@Slf4j
@AllArgsConstructor
public class ClassModelServiceimpl implements ClassModelService {

    private final ClassModelRepository classModelRepo;
    private final CourseModelRepository courseRepo;
    private final UserModelRepository userRepo;
    private final UserCourseClassesModelRepo userCourseRepo;
    @Override
    public ClassModel create(ClassModelRequest classDto) {
        try {
            int course_id = classDto.getCourse_id();
            Optional<CourseModel> course = courseRepo.findById(course_id);
            log.info("course find by id--------> ", course);
            if(course.isEmpty()) {
                throw new RuntimeException("Không tìm thấy course tương ứng");
            }
            ClassModel classModel = new ClassModel();
            classModel.setName(classDto.getName());
            classModel.setCode(classDto.getCode());
            classModel.setCreated_at(new Date());
            classModel.setStatus(classDto.getStatus());
            classModel.setCourse_id(classDto.getCourse_id());

            var save = classModelRepo.save(classModel);
            return save;

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public UserCourseClassReponse joinClass(UserCourseClassRequest joinDto) {
        log.info("log join---> ", joinDto);
        int class_id = joinDto.getClass_id();
        Optional<ClassModel> classData = classModelRepo.findById(class_id);
        log.info("class find by id--------> ", classData);
        if(joinDto.getUser_id() == null) {
            throw new RuntimeException("Không tìm thấy user tương ứng");
        }
        if(classData.isEmpty()) {
            throw new RuntimeException("Không tìm thấy lớp học tương ứng");
        }
        UserCourseClassesModel userJoin = new UserCourseClassesModel();
        userJoin.setClass_id(joinDto.getClass_id());
        userJoin.setUser_id(joinDto.getUser_id());
        userJoin.setCreated_at(new Date());
        userJoin.setCourse_id(classData.get().getCourse_id());
        var response = userCourseRepo.save(userJoin);
        if(response != null) {
            Optional<UserModel> user = userRepo.findById(joinDto.getUser_id());
            Optional<CourseModel> course = courseRepo.findById(classData.get().getCourse_id());
            Optional<ClassModel> classroom = findOne(joinDto.getClass_id()).getResult();
            return new UserCourseClassReponse(response.getId(),
                    response.getClass_id(), response.getCourse_id(),
                    response.getUser_id(), user.get(), classroom.get(), course.get(),
                    response.getCreated_at(), response.getUpdated_at()
                    );
        }else {
            throw new RuntimeException("Có lỗi xảy ra khi join class");
        }
    }

    @Override
    public List<ClassModel> findAll(String page, String page_size, String code, String course_id) {
        List<ClassModel> classModel = classModelRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size), code, course_id);
        return classModel;
    }

    @Override
    public ClassModelReponse findOne(int id) {
        Optional<ClassModel>  classItem= classModelRepo.findById(id);
        return new ClassModelReponse(classItem);
    }

    @Override
    public ClassModel update(int id, ClassModelRequest classDto) {
        log.info("id------> ", id);
        ClassModel classModel = classModelRepo.getById(id);
        log.info("User------> ", classModel);
        if(classModel == null) {
            throw new RuntimeException("Không tìm thấy lớp học tương ứng");
        }
        if(classDto.getCourse_id() == null) {
            throw new RuntimeException("Vui lòng chọn khóa học");
        }
        int course_id = classDto.getCourse_id();
        Optional<CourseModel> course = courseRepo.findById(course_id);
        log.info("course find by id--------> ", course);
        if(course.isEmpty()) {
            throw new RuntimeException("Không tìm thấy khóa học tương ứng");
        }
        classModel.setName(classDto.getName());
        classModel.setCode(classDto.getCode());
        classModel.setUpdated_at(new Date());
        classModel.setStatus(classDto.getStatus());
        classModel.setCourse_id(classDto.getCourse_id());

        var response = classModelRepo.save(classModel);
        return response;
    }

    @Override
    public void deleteById(int id) {
        classModelRepo.deleteById(id);
    }

    @Override
    public BaseResponse.Metadata countByCondition(String page, String page_size, String code, String course_id) {
        long total = (long) classModelRepo.count(code, course_id);
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }
}
