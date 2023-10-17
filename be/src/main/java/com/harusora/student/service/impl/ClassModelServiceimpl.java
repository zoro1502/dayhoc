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
import com.harusora.student.user.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public UserCourseClassReponse joinClass(int id, UserCourseClassRequest joinDto) {
        log.info("log join---> ", joinDto);
        int class_id = id;
        Optional<ClassModel> classData = classModelRepo.findById(class_id);
        log.info("class find by id--------> ", classData);
        if(joinDto.getUser_id() == null) {
            throw new RuntimeException("Not found user");
        }
        Optional<UserModel> userOld = userRepo.findById(joinDto.getUser_id());
        if(userOld.isEmpty()) {
            throw new RuntimeException("Not found user");
        }
//        if(userOld.get().getRole() != 3) {
//            throw new RuntimeException("Just student to join classroom");
//        }
        if(userOld.get().getStatus() != 1) {
            throw new RuntimeException("User not active");
        }
        if(classData.isEmpty()) {
            throw new RuntimeException("Not found classroom");
        }
        if(classData.get().getStatus() != 1) {
            throw new RuntimeException("Classroom not active");
        }
        UserCourseClassesModel userJoinOld = userCourseRepo.findByStudentIdAndClassId(joinDto.getUser_id(), class_id);
        if(userJoinOld != null) {
            throw new RuntimeException("You have joined this classroom");
        }
        UserCourseClassesModel userJoin = new UserCourseClassesModel();
        userJoin.setClass_id(id);
        userJoin.setUser_id(joinDto.getUser_id());
        userJoin.setCreated_at(new Date());
        userJoin.setCourse_id(classData.get().getCourse_id());
        var response = userCourseRepo.save(userJoin);
        if(response != null) {
            Optional<UserModel> user = userRepo.findById(joinDto.getUser_id());
            Optional<CourseModel> course = courseRepo.findById(classData.get().getCourse_id());
            Optional<ClassModel> classroom = findOne(id).getClassroom();
            return new UserCourseClassReponse(response.getId(),
                    response.getClass_id(), response.getCourse_id(),
                    response.getUser_id(), user.get(), classroom.get(), course.get(),
                    response.getCreated_at(), response.getUpdated_at()
                    );
        }else {
            throw new RuntimeException("Error to join class");
        }
    }

    @Override
    public List<ClassModelReponse> findAll(String page, String page_size, String code, String course_id, String user_id, String student_id) {
        List<ClassModelReponse> response = new ArrayList<ClassModelReponse>();
        List<ClassModel> classModel = classModelRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size),
                code, course_id
                , user_id
        );
        if(!classModel.isEmpty()) {
            for(ClassModel room : classModel) {
                Optional<CourseModel> course = courseRepo.findById(room.getCourse_id());
                ClassModelReponse itemRes = new ClassModelReponse();
                itemRes.setCourse(course);
                itemRes.setClassroom(Optional.of(room));
                if(!course.isEmpty()) {
                    Optional<UserModel> user = userRepo.findById(course.get().getUser_id());
                    itemRes.setTeacher(user);
                }
                if(student_id != null && !student_id.equals("")) {
                    UserCourseClassesModel studentClass = userCourseRepo.findByStudentIdAndClassId(parseInt(student_id), room.getId());
                    if(studentClass != null) {
                        Optional<UserModel> student = userRepo.findById(parseInt(student_id));
                        if(!student.isEmpty()) {
                            itemRes.setStudent(student);
                        }
                    }
                }

                response.add(itemRes);
            }
        }
        return response;
    }

    @Override
    public ClassModelReponse findOne(int id) {
        ClassModelReponse response = new ClassModelReponse();
        Optional<ClassModel>  classItem= classModelRepo.findById(id);
        if(!classItem.isEmpty()) {
            Optional<CourseModel> course = courseRepo.findById(classItem.get().getCourse_id());
            response.setCourse(course);
            response.setClassroom(classItem);
            if(!course.isEmpty()) {
                Optional<UserModel> user = userRepo.findById(course.get().getUser_id());
                response.setTeacher(user);
            }

        }
        return response;
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
    public BaseResponse.Metadata countByCondition(String page, String page_size, String code, String course_id, String user_id) {
        long total = (long) classModelRepo.count(code, course_id, user_id);
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }
}
