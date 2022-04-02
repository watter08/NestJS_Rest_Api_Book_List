import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/libs/dto/book.dto';
import { BookInterface } from 'src/libs/interfaces/book.interface';
import { HttpService } from '@nestjs/axios';
import httpService, { AxiosResponse  } from 'axios';
import {  Observable } from 'rxjs';

const Ruta: string = 'https://fakerestapi.azurewebsites.net/api/v1/Books/';

@Injectable()
export class BookService {
    constructor(public httpServce: HttpService) { }

     async findAll(): Promise<Observable<AxiosResponse<BookInterface[]>>> {
        let data = await httpService.get(Ruta);
        return data.data;
    }


    async findOne(id : number): Promise<Observable<AxiosResponse<BookInterface>>> {
        let data = await httpService.get(`${Ruta}${id}`);
        return data.data;
    }

    async createBook(createBookDto : CreateBookDto): Promise<Observable<AxiosResponse<BookInterface>>> {
        let data = await httpService.post(Ruta , createBookDto);
        return data.data;
    }

    async updateOne(id : number , createBookDto : CreateBookDto): Promise<Observable<AxiosResponse<BookInterface>>> {
        let data = await httpService.put(`${Ruta}${id}` , createBookDto);
        return data.data;
    }

    async deleteOne(id : number): Promise<Observable<AxiosResponse<any | any>>> {
        return await httpService.delete(`${Ruta}${id}`);
    }
}
