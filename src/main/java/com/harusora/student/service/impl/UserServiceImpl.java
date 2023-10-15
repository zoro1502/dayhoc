package com.harusora.student.service.impl;
import com.harusora.student.model.UserModel;
import com.harusora.student.repository.UserModelRepository;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.UserModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.Integer.parseInt;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserModelService {

    private final UserModelRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserModelResponse create(UserModelRequest userDto) {
            log.debug(userDto.getFull_name());

            UserModel user = new UserModel();
            user.setFull_name(userDto.getFull_name());
            user.setRole(userDto.getRole());
            user.setEmail(userDto.getEmail());
            user.setAddress(userDto.getAddress());
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
        List<UserModel> users = userRepo.findAndCount(parseInt(page) * parseInt(page_size) -1, parseInt(page_size), email, role, phone);
        return users;
    }

    @Override
    public UserModelResponse findOne(int id) {
        Optional<UserModel> user = userRepo.findById(id);
        return new UserModelResponse(user);
    }

    @Override
    public UserModel update(int id, UserModelRequest userDto) {
        log.info("id------> ", id);
        UserModel user = userRepo.getById(id);
        log.info("User------> ", user);
        if(user == null) {
            throw new RuntimeException("Không tìm thấy user tương ứng");
        }
        user.setFull_name(userDto.getFull_name());
        user.setRole(userDto.getRole());
        user.setAddress(userDto.getAddress());
        user.setStatus(userDto.getStatus());
        user.setUpdated_at(new Date());
        user.setGender(userDto.getGender());
        userRepo.save(user);
        UserModelResponse result = new UserModelResponse(Optional.ofNullable(user));
        return user;

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
}
