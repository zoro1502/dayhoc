package com.harusora.student.service.impl;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import com.harusora.student.model.UserModel;
import com.harusora.student.repository.ClassModelRepository;
import com.harusora.student.repository.CourseModelRepository;
import com.harusora.student.request.ClassModelRequest;
import com.harusora.student.response.ClassModelReponse;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.UserModelResponse;
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
