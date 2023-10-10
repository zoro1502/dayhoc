import {Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { randomUUID } from 'crypto';
import Path = require('path');
import {BaseResponse} from "../../helpers/response/response";
import {HTTP_STATUS} from "../../helpers/constants/constants";
import {ApiResponse} from "@nestjs/swagger";
import * as process from "process";

const storage = {
    storage : diskStorage({
        destination: './files',
        filename: (req, file, cb) =>{
            const filename: string = 'image-' + randomUUID();
            const extension: string = Path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`)
        }
    })
}

@Controller('upload')
export class UploadController {
    @Post('image')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file', storage))
    @ApiResponse({ status: 200, description: 'success' })
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            let URL = process.env.URL_IMAGE;
            file.destination = URL + file.filename;
            return BaseResponse(HTTP_STATUS.success, file, '', 'Successful');
        } catch (e) {
            console.log('get error upload ---------->', e.message);
            return BaseResponse('error', {},'', e.message);
        }
    }

    @Get(':path')
    seeUploadedFile(@Param('path') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }
}
