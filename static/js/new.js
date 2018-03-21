var app = angular.module("myApp", ['angularUtils.directives.dirPagination', 'ngRoute', 'angucomplete-alt']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/page1", {
            templateUrl: "pages/page1.html",
            controller: "myCtrlForStudents"
        })
        .when("/page2", {
            templateUrl: "pages/page2.html",
            controller: "myCtrlForDepartment"
        })
        .when("/page3", {
            templateUrl: "pages/page3.html",
            controller: "myCtrlForCourse"
        })
        .when("/page4", {
            templateUrl: "pages/page4.html",
            controller: "myCtrlForInstructor"
        })
        .when("/page5", {
            templateUrl: "pages/page5.html",
            controller: "myCtrlForSection"
        })
        .when("/page6", {
            templateUrl: "pages/page6.html",
            controller: "myCtrlForEnrollment"
        })
        .otherwise({
            redirectTo: "/page1"
        });
});


app.controller("myCtrlForStudents", function ($scope, $http) {
    $scope.messageOfSaveStudent = "";
    $scope.student = {
        "id": "",
        "firstName": "",
        "lastName": "",
        "age": "",
        "gpa": ""
    };
    $scope.allStudents = "";
    $scope.currentPageStd = 1;
    $scope.selectedDepartmentOfStudent = {
        "id": "",
        "code": "",
        "name": ""
    };
    $scope.sendStudentData = function () {
        var url = "/saveStudent",
            data = {
                "firstName": $scope.student.firstName,
                "lastName": $scope.student.lastName,
                "age": $scope.student.age,
                "gpa": $scope.student.gpa,
                "departmentId": $scope.selectedDepartmentOfStudent.id
            };
        $http.post(url, data).then(function mySuccess(response) {
            $scope.student = {
                "firstName": "",
                "lastName": "",
                "age": "",
                "gpa": ""
            };
            $scope.selectedDepartmentOfStudent = {
                "id": "",
                "code": "",
                "name": ""
            };
            $scope.messageOfSaveStudent = response.data;
            if ($scope.messageOfSaveStudent === "") {
                $scope.getStudentsData();
            }

        }, function myError(response) {
            $scope.messageOfSaveStudent = response.statusText;
        });
    };
    $scope.pageSize = 10;
    $scope.deleteStudent = function (a, b, c) {
        if (confirm("Are you sure delete this STUDENT : " + b + " " + "c " + " ?")) {
            $http.post("/deleteStudent", {
                "id": a,
                "name": b,
                "age": c
            }).then(function mySuccess(response) {

                $scope.getStudentsData();
            }, function myError(response) {});
        } else {
            return false;
        }
    };
    $scope.getStudentsData = function () {
        $http.get("/getAllStudents").then(function mySuccess(response) {
            $scope.allStudents = response.data;
        }, function myError(response) {
            $scope.messageOfSaveStudent = response.statusText;
        });
    };
    $http.get("/getAllDepartments").then(function mySuccess(response) {
        $scope.allDepartments = response.data;
    }, function myError(response) {
        $scope.messageOfSaveDepartment = response.statusText;
    });
    $scope.komplexStudent = {
        "student": " ",
        "sections": ""
    };
    $scope.setStudent = function (firstName, lastName, sections) {
        $scope.komplexStudent.student = firstName + " " + lastName;
        $scope.komplexStudent.sections = sections;
    };
    $scope.getStudentsData();
});



app.controller("myCtrlForDepartment", function ($scope, $http) {
    $scope.messageOfSaveDepartment = "";
    $scope.allDepartments = "";
    $scope.currentPageDpt = 1;
    $scope.pageSize = 10;
    $scope.department = {
        "id": "",
        "code": "",
        "name": ""
    };
    $scope.sendDepartmentData = function () {
        var url = "/saveDepartment",
            data = {
                "code": $scope.department.code,
                "name": $scope.department.name
            };
        $http.post(url, data).then(function mySuccess(response) {

            $scope.department = {
                "code": "",
                "name": ""
            };
            $scope.messageOfSaveDepartment = response.data;
            if ($scope.messageOfSaveDepartment === "") {
                $scope.getDepartmentData();
            }
        }, function myError(response) {
            $scope.messageOfSaveDepartment = response.statusText;
        });
    };
    $scope.deleteDepartment = function (a, b, c) {
        if (confirm("Are you sure delete this DEPARTMENT : " + b + " - " + c + " ?")) {
            $http.post("/deleteDepartment", {
                "id": a,
                "code": b,
                "name": c
            }).then(function mySuccess(response) {

                $scope.getDepartmentData();
            }, function myError(response) {});
        } else {
            return false;
        }
    };
    $scope.getDepartmentData = function () {
        $http.get("/getAllDepartments").then(function mySuccess(response) {
            $scope.allDepartments = response.data;
        }, function myError(response) {
            $scope.messageOfSaveDepartment = response.statusText;
        });
    };
    $scope.getDepartmentData();
});



app.controller("myCtrlForCourse", function ($scope, $http) {
    $scope.messageOfSaveCourse = "";
    $scope.course = {
        "id": "",
        "title": "",
        "credit": ""
    };
    $scope.pageSize = 10;
    $scope.currentPageCourse = 1;
    $scope.selectedDepartmentOfCourse = {
        "id": "",
        "code": "",
        "name": ""
    };
    $scope.sendCourseData = function () {
        var url = "/saveCourse",
            data = {
                "title": $scope.course.title,
                "credit": $scope.course.credit,
                "departmentId": $scope.selectedDepartmentOfCourse.id
            };
        $http.post(url, data).then(function mySuccess(response) {
            $scope.course = {
                "id": "",
                "title": "",
                "credit": ""
            };
            $scope.selectedDepartmentOfCourse = {
                "id": "",
                "code": "",
                "name": ""
            };
            $scope.messageOfSaveCourse = response.data;
            if ($scope.messageOfSaveCourse === "") {
                $scope.getCoursesData();
            }
        }, function myError(response) {
            $scope.messageOfSaveCourse = response.statusText;
        });
    };
    $scope.deleteCourse = function (a, b, c, d) {
        if (confirm("Are you sure delete this COURSE : " + b + " ?")) {
            $http.post("/deleteCourse", {
                "id": a,
                "title": b,
                "credit": c,
                "departmentId": d
            }).then(function mySuccess(response) {

                $scope.getCoursesData();
            }, function myError(response) {});
        } else {
            return false;
        }
    };
    $scope.getCoursesData = function () {
        $http.get("/getAllCourses").then(function mySuccess(response) {
            $scope.allCourses = response.data;
        }, function myError(response) {
            $scope.messageOfSaveCourse = response.statusText;
        });
    };
    $http.get("/getAllDepartments").then(function mySuccess(response) {
        $scope.allDepartments = response.data;
    }, function myError(response) {
        $scope.messageOfSaveDepartment = response.statusText;
    });
    $scope.getCoursesData();
});



app.controller("myCtrlForInstructor", function ($scope, $http) {
    $scope.messageOfSaveInstructor = "";
    $scope.allInstructors = "";
    $scope.currentPageInstructor = 1;
    $scope.pageSize = 10;
    $scope.instructor = {
        "id": "",
        "firstName": "",
        "lastName": "",
        "age": ""
    };
    $scope.sendInstructorData = function () {
        var url = "/saveInstructor",
            data = {
                "firstName": $scope.instructor.firstName,
                "lastName": $scope.instructor.lastName,
                "age": $scope.instructor.age
            };
        $http.post(url, data).then(function mySuccess(response) {
            $scope.instructor = {
                "id": "",
                "firstName": "",
                "lastName": "",
                "age": ""
            };
            $scope.messageOfSaveInstructor = response.data;
            if ($scope.messageOfSaveInstructor === "") {
                $scope.getInstructorData();
            }
        }, function myError(response) {
            $scope.messageOfSaveInstructor = response.statusText;
        });
    };
    $scope.deleteInstructor = function (a, b, c, d) {
        if (confirm("Are you sure delete this INSTRUCTOR : " + b + " " + c + " " + d + " ?")) {
            $http.post("/deleteInstructor", {
                "id": a,
                "firstName": b,
                "lastName": c,
                "age": d
            }).then(function mySuccess(response) {
                $scope.getInstructorData();
            }, function myError(response) {});
        } else {
            return false;
        }
    };
    $scope.getInstructorData = function () {
        $http.get("/getAllInstructors").then(function mySuccess(response) {
            $scope.allInstructors = response.data;
        }, function myError(response) {
            $scope.messageOfSaveInstructor = response.statusText;
        });
    };
    $scope.getInstructorData();
});



app.controller("myCtrlForSection", function ($scope, $http) {
    $scope.messageOfSaveSection = "";
    $scope.allSections = "";
    $scope.currentPageSection = 1;

    $scope.section = {
        "id": "",
        "courseId": "",
        "number": "",
        "instructorId": ""
    };

    $scope.sendSectionData = function () {
        var url = "/saveSection",
            data = {
                "courseId": $scope.selectedCourseOfSection.id,
                "number": $scope.section.number,
                "instructorId": $scope.selectedInstructorOfSection.id
            };
        $http.post(url, data).then(function mySuccess(response) {
            $scope.section = {
                "id": "",
                "courseId": "",
                "number": "",
                "instructorId": ""
            };
            $scope.selectedCourseOfSection = {
                "id": "",
                "title": "",
                "credit": ""
            };
            $scope.selectedInstructorOfSection = {
                "id": "",
                "firstName": "",
                "lastName": "",
                "age": ""
            };
            $scope.messageOfSaveSection = response.data;
            if ($scope.messageOfSaveSection === "") {
                $scope.getSectionData();
            }

        }, function myError(response) {
            $scope.messageOfSaveSection = response.statusText;
        });
    };
    $scope.deleteSection = function (a, b, c, d) {
        if (confirm("Are you sure delete this SECTİON : " + b + "-" + c + " " + d + " ?")) {
            $http.post("/deleteSection", {
                "id": a,
                "courseId": b,
                "number": c,
                "instructorId": d
            }).then(function mySuccess(response) {

                $scope.getSectionData();
            }, function myError(response) {});
        } else {
            return false;
        }
    };
    $scope.getSectionData = function () {
        $http.get("/getAllSections").then(function mySuccess(response) {
            $scope.allSections = response.data;
        }, function myError(response) {
            $scope.messageOfSaveSection = response.statusText;
        });
    };
    $scope.komplexSection = {
        "course": " ",
        "instructor": "",
        "departmant": "",
        "students": ""
    };
    $scope.setSection = function (number, courseTitle, courseCredit, departCode, departName, instFirst, instLast, instAge, students) {
        $scope.komplexSection.course = courseTitle + "-" + number + "    Credit:" + courseCredit;
        $scope.komplexSection.instructor = instFirst + " " + instLast + "  " + instAge;
        $scope.komplexSection.departmant = departCode + " - " + departName;
        $scope.komplexSection.students = students;
    };
    $http.get("/getAllInstructors").then(function mySuccess(response) {
        $scope.allInstructors = response.data;
    }, function myError(response) {
        $scope.messageOfSaveInstructor = response.statusText;
    });
    $http.get("/getAllCourses").then(function mySuccess(response) {
        $scope.allCourses = response.data;
    }, function myError(response) {
        $scope.messageOfSaveCourse = response.statusText;
    });
    $scope.getSectionData();
});



app.controller("myCtrlForEnrollment", function ($scope, $http) {
    $scope.messageOfSaveEnrollment = "";
    $scope.enrollment = {
        "studentId": "",
        "sectionId": ""
    };
    $scope.allEnrollments = "";
    $scope.currentPageEnrollment = 1;
    $scope.pageSize = 10;
    $scope.selectedStudentOfEnrollment = {
        "id": "",
        "firstName": "",
        "lastName": "",
        "age": "",
        "gpa": ""
    };
    $scope.selectedSectionOfEnrollment = {
        "id": "",
        "courseId": "",
        "number": "",
        "instructorId": ""
    };
    $scope.sendEnrollmentData = function () {
        var url = "/saveEnrollment",
            data = {
                "studentId": $scope.selectedStudentOfEnrollment.id,
                "sectionId": $scope.selectedSectionOfEnrollment.id
            };
        $http.post(url, data).then(function mySuccess(response) {
            $scope.messageOfSaveEnrollment = response.data;
            if ($scope.messageOfSaveEnrollment === "") {
                $scope.getEnrollmentData();
            }
        }, function myError(response) {
            $scope.messageOfSaveEnrollment = response.statusText;
        });
    };
    $scope.deleteEnrollment = function (a, b, c) {
        if (confirm("Are you sure delete this Enrollment : " + a + " " + b + " ?")) {
            $http.post("/deleteEnrollment", {
                "id": a,
            }).then(function mySuccess(response) {

                $scope.getEnrollmentData();
            }, function myError(response) {});
        } else {
            return false;
        }
    };
    $scope.getEnrollmentData = function () {
        $http.get("/getAllEnrollments").then(function mySuccess(response) {
            $scope.allEnrollments = response.data;
        }, function myError(response) {
            $scope.messageOfSaveEnrollment = response.statusText;
        });
    };
    $scope.getEnrollmentData();
    $http.get("/getAllSections").then(function mySuccess(response) {
        $scope.allSections = response.data;
    }, function myError(response) {
        $scope.messageOfSaveSection = response.statusText;
    });
    $http.get("/getAllStudents").then(function mySuccess(response) {
        $scope.allStudents = response.data;
    }, function myError(response) {
        $scope.messageOfSaveStudent = response.statusText;
    });
});