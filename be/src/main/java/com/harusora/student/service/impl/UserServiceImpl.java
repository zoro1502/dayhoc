package com.harusora.student.service.impl;
import com.harusora.student.model.UserModel;
import com.harusora.student.repository.UserModelRepository;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.Integer.parseInt;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserModelService {

    private final UserModelRepository userRepo;
//    private final  userRepo;
    private final PasswordEncoder passwordEncoder;

    private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    @Override
    public UserModelResponse create(UserModelRequest userDto) {
            log.debug(userDto.getFull_name());
            findUserByEmail(userDto, 0);
            UserModel user = new UserModel();
            user.setFull_name(userDto.getFull_name());
            user.setRole(userDto.getRole());
            user.setEmail(userDto.getEmail());
            user.setPhone(userDto.getPhone());
            user.setAddress(userDto.getAddress());
//            if()
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user.setStatus(userDto.getStatus());
            user.setUpdated_at(new Date());
            user.setCreated_at(new Date());
            user.setGender(userDto.getGender());
            var save = userRepo.save(user);
            UserModelResponse response = new UserModelResponse(Optional.of(save));
            return response;
    }

    @Override
    public List<UserModel> findAll(String page, String page_size, String email, String phone, String status, String role) {
        log.info("page-------> " + ((parseInt(page) - 1) * parseInt(page_size)) + page_size);
        List<UserModel> users = userRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size), email, role, phone, status);
        return users;
    }

    @Override
    public UserModelResponse findOne(int id) {
        Optional<UserModel> user = userRepo.findById(id);
        return new UserModelResponse(user);
    }

    @Override
    public UserModelResponse update(int id, UserModelRequest userDto) {
        log.info("id------> ", id);
        findUserByEmail(userDto, id);
        UserModel user = userRepo.getById(id);
        log.info("User------> ", user);
        if(user == null) {
            throw new RuntimeException("Không tìm thấy user tương ứng");
        }
        user.setFull_name(userDto.getFull_name());
        user.setRole(userDto.getRole());
        user.setAddress(userDto.getAddress());
        user.setStatus(userDto.getStatus());
        user.setPhone(userDto.getPhone());
        user.setAvatar(userDto.getAvatar());
        user.setUpdated_at(new Date());
        user.setGender(userDto.getGender());
        var response = userRepo.save(user);
        return new UserModelResponse(Optional.of(response));

    }

    public List<?> findByConditions(UserModel condition) {
        List<UserModelResponse> users = new ArrayList<>();
        return users;
    }

    @Override
    public BaseResponse.Metadata countByCondition(String page, String page_size, String email, String phone, String status, String role) {
        long total = (long) userRepo.count(email, role, phone);
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }

    private void findUserByEmail(UserModelRequest userDto, int id) {
        if(userDto.getEmail() != null || userDto.getEmail() != "") {
            UserModel user = userRepo.findByEmail(userDto.getEmail());

            if(user != null) {
                log.error("User email----------> " + user.getId() + user.getEmail());
                log.error("check email------> " + Objects.equals(user.getEmail(), userDto.getEmail()));
                if(Objects.equals(user.getEmail(), userDto.getEmail()) && user.getId() != id) {
                    throw new RuntimeException("Email đã tồn tại");
                }
            }
        }
        if(userDto.getPhone() != null || userDto.getPhone() != "") {
            UserModel user = userRepo.findByPhone(userDto.getPhone());

            if(user != null) {
                log.error("User email----------> " + user.getId() + user.getPhone());
                log.error("check email------> " + Objects.equals(user.getPhone(), userDto.getPhone()));
                if(Objects.equals(user.getPhone(), userDto.getPhone()) && user.getId() != id) {
                    throw new RuntimeException("Số điện thoại đã tồn tại");
                }
            }
        }
    }
}
