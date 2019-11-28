package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.Student;
import ba.telegroup.university_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("student")
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
        return studentRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Student getById(@PathVariable Integer id) {
        return studentRepository.getById(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public Student insert(@RequestBody Student student) {
        Student insertedStudent = studentRepository.saveAndFlush(student);
        entityManager.refresh(insertedStudent);
        System.out.println(insertedStudent.getId());
        return insertedStudent;
    }

    @PutMapping(value = "/")
    public Student update(@RequestBody Student student) {
        if (studentRepository.getById(student.getId()) != null) {
            Student updatedStudent = studentRepository.saveAndFlush(student);
            entityManager.refresh(updatedStudent);
            return updatedStudent;
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

}
