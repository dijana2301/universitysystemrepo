package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.Student;
import ba.telegroup.university_system.model.modelCustom.StudentStudyProgram;
import ba.telegroup.university_system.repository.StudentRepository;
import ba.telegroup.university_system.util.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/hub/student")
@Scope("request")
public class StudentController {

    private final StudentRepository studentRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping(value = "/")
    public List<Student> getAll() {
        return studentRepository.getAllByActive((byte) 1);
    }

    @GetMapping(value = "/{id}")
    public Student getById(@PathVariable Integer id) {
        return studentRepository.getById(id);
    }

    @GetMapping(value = "/custom/")
    public List<StudentStudyProgram> getAllCustom() {
        return studentRepository.getAllCustom();
    }

    @GetMapping(value = "/custom/{id}")
    public StudentStudyProgram getByIdCustom(@PathVariable Integer id) {
        return studentRepository.getByIdCustom(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public StudentStudyProgram insert(@RequestBody Student student) {
        Student insertedStudent = studentRepository.saveAndFlush(student);
        entityManager.refresh(insertedStudent);
        System.out.println(insertedStudent.getId());
        return getByIdCustom(insertedStudent.getId());
    }

    @PutMapping(value = "/")
    public StudentStudyProgram update(@RequestBody Student student) {
        if (studentRepository.getById(student.getId()) != null) {
            student.setActive((byte) 1);
            Student updatedStudent = studentRepository.saveAndFlush(student);
//            entityManager.refresh(updatedStudent);
            return studentRepository.getByIdCustom(updatedStudent.getId());
        } else
            return null;
    }

    @DeleteMapping(value = "/{id}")

    public String delete(@PathVariable Integer id) {
        Student student = studentRepository.getById(id);
        if (student != null) {
            student.setActive((byte) 0);
            studentRepository.saveAndFlush(student);
            return "Success";
        } else
            return "Fail";
    }


    @GetMapping(value = "/values")
    public List<Value> getAllValues() {
        List<Student> studentList = studentRepository.findAll();
        List<Value> result = new ArrayList<>();
        for (Student student : studentList) {
            result.add(new Value(student.getId(), student.getFirstName() + " " + student.getLastName()));
        }

        return result;
    }
}

