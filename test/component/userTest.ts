
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import swal from 'sweetalert2';

import { UserService } from '../../controllers/user';
import { User } from '../../models/users';

const path = "http://localhost:3000/api/latest/users";

const listUser: User[] = [
    {
        active: true,
        firstname: "adminTest0",
        id_type: "CC - CedulaCiudadania",
        lastname: "",
        password: "adminTest0",
        photo: "",
        username: "adminTest0",
        _id: "9999999"
    },
    {
        active: true,
        firstname: "adminTest1",
        id_type: "CC - CedulaCiudadania",
        lastname: "",
        password: "adminTest1",
        photo: "",
        username: "adminTest1",
        _id: "8888888"
    },
    {
        active: true,
        firstname: "adminTest2",
        id_type: "CC - CedulaCiudadania",
        lastname: "",
        password: "adminTest2",
        photo: "",
        username: "adminTest2",
        _id: "7777777"
    }
];

const user: User = {
    active: true,
    firstname: "adminTest3",
    id_type: "CC - CedulaCiudadania",
    lastname: "",
    password: "adminTest3",
    photo: "",
    username: "adminTest3",
    _id: "6666666"
};

describe('UserService', () => {

    let service: UserService;
    let httpMock : HttpTestingController;
    let storage = {};

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UserService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach( ()=> {
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);

        storage = {};
        spyOn(localStorage, 'getItem').and.callFake ( (key: string) => {
            return storage[key] ? storage[key] : null;
        });

        spyOn(localStorage, 'setItem').and.callFake ( (key: string, value: string) => {
            return storage[key] = value;
        });
    });

    afterAll( () => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getUser return a list of user and does a get method', () => {
        service.getUsers().subscribe((resp: User[]) => {
            expect(resp).toEqual(listUser);
        });
        const req = httpMock.expectOne(path);
        expect(req.request.method).toBe('GET');
        req.flush(listUser);
    });

    it('getUsers return empty array when localStorage is empty', () => {
        const listUser = service.getUsers();
        expect(listUser.length).toBe(0);
    });


    it('addUser add a user successfully when the list does not exist in the localStorage', () => {
        const toast = {
            fire: () => null
        } as any;
        const spy1 = spyOn(swal, 'mixin').and.callFake( () => {
            return toast;
        });
        let listUser = service.getUsers();
        expect(listUser.length).toBe(0);
        service.create(user);
        listUser = service.getUsers();
        service.create(user);
        expect(spy1).toHaveBeenCalled();
    });


    it('removeUser removes the list from the localStorage', () => {
        service.create(user);
        let listUser = service.getUsers();
        expect(listUser.length).toBe(1);
        service.removeUsers();
        listUser = service.getUsers();
        expect(listUser.length).toBe(0);
    });


});