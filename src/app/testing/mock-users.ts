import { User } from "../api/user";

export const TEST_USER = new User();
TEST_USER.firstname = 'Tim';
TEST_USER.lastname = 'Test';
TEST_USER.id = 'TEST_USER';
TEST_USER.roles = ['user'];


export const TEST_PUBLISHER = new User();
TEST_PUBLISHER.firstname = 'Tom';
TEST_PUBLISHER.lastname = 'Phome';
TEST_PUBLISHER.id = 'TEST_PUBLISHER';
TEST_PUBLISHER.roles = ['publisher'];

export const TEST_ADMIN = new User();
TEST_ADMIN.firstname = 'Adam';
TEST_ADMIN.lastname = 'Test';
TEST_ADMIN.id = 'TEST_ADMIN';
TEST_ADMIN.roles = ['admin']; 