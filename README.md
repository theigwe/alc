ALC 2.0 ASSESSMENT API
======================

Using this API endpoints, you can create, read, update and delete student records. This is designed for assessment purpose. There is no authentication required to use the endpoints; as this was not designed for production purposes.

Get the project source code on [Github](https://github.com/sammyni/alc). To run the app, you will need [MongoDB](https://www.mongodb.com/) on your machine.

### List All Students

Use the list method endpoint to get the list of all students.

`URL:` /api/student/list/

`Method:` GET

Response: 200 OK, application/json
```node
{
    "status":200,
    "data":{
        "number":n,
        "students":
        [
            {
                "reg_number" : "123456",
                "first_name" : "Ndubuisi",
                "middle_name" : "Igwe",
                "last_name" : "Samuel",
                "age" : "29",
                "level" : "Graduate",
                "department" : "Engineering"
            },
            {
                ...
            }
        ]
    }
}
```

### Create Profile

With the create method, you can add new student to the existing list.

`URL:` /api/student/create

`Method:` POST

`$reg_number` Unique registration number.
`$first_name` Student's given name.
`$middle_name` Student's middle name.
`$last_name` Student's family name.
`$age` Student's age in digits (eg. 18).
`$level` Student's class or level.
`$department` Student's department.

Response: 200 OK, application/json

```node
{
    "status":200,
    "data":
    {
        "reg_number" : "123456",
        "first_name" : "Ndubuisi",
        "middle_name" : "Igwe",
        "last_name" : "Samuel",
        "age" : "29",
        "level" : "Graduate",
        "department" : "Engineering"
    }
}
```

### View Student

With the view method, you can read the record of single student using the student's registration number.

`URL:` /api/student/view/$reg

`Method:` GET

`$reg` Unique registration number.

Response: 200 OK, application/json

```node
{
    "status":200,
    "data":
    {
        "reg_number" : "123456",
        "first_name" : "Ndubuisi",
        "middle_name" : "Igwe",
        "last_name" : "Samuel",
        "age" : "29",
        "level" : "Graduate",
        "department" : "Engineering"
    }
}
```

### Update Profile

This method updates existing student's record.

`URL:` /api/student/update

`Method:` POST

`$reg_number` Unique registration number.
`$first_name` Student's given name.
`$middle_name` Student's middle name.
`$last_name` Student's family name.
`$age Student's` age in digits (eg. 18).
`$level Student's` class or level.
`$department` Student's department.

Response: 200 OK, application/json

```node
{
    "status":200,
    "data":
    {
        "reg_number" : "123456",
        "first_name" : "Ndubuisi",
        "middle_name" : "Igwe",
        "last_name" : "Samuel",
        "age" : "29",
        "level" : "Graduate",
        "department" : "Engineering"
    }
}
```

### Delete Profile

With the delete method, you can remove student's profile permanently.

`URL:` /api/student/delete/$reg

`Method:` GET

`$reg` Unique registration number.

Response: 200 OK, application/json

`{ "status":200, "data": ""}`
