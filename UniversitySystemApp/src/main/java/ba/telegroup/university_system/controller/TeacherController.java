package ba.telegroup.university_system.controller;


import ba.telegroup.university_system.model.Teacher;
import ba.telegroup.university_system.model.modelCustom.TeacherTitle;
import ba.telegroup.university_system.repository.TeacherRepository;
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
@RequestMapping("/hub/teacher")
@Scope("request")
public class TeacherController {

    private final TeacherRepository teacherRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public TeacherController(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @GetMapping(value = "/")
    public List<Teacher> getAll() {
        return teacherRepository.getAllByActive((byte) 1);
    }

    @GetMapping(value = "/{id}")
    public Teacher getById(@PathVariable Integer id) {
        return teacherRepository.getById(id);
    }

    @GetMapping(value = "/custom/")
    public List<TeacherTitle> getAllCustom() {
        return teacherRepository.getAllCustom();
    }

    @GetMapping(value = "/custom/{id}")
    public TeacherTitle getByIdCustom(@PathVariable Integer id) {
        return teacherRepository.getByIdCustom(id);
    }


    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherTitle insert(@RequestBody Teacher teacher) {
        Teacher insertedTeacher = teacherRepository.saveAndFlush(teacher);
        entityManager.refresh(insertedTeacher);
        System.out.println(insertedTeacher.getId());
        return getByIdCustom(insertedTeacher.getId());
    }

    @Transactional
    @PutMapping(value = "/")
    public TeacherTitle update(@RequestBody Teacher teacher) {
        if (teacherRepository.getById(teacher.getId()) != null) {
            teacher.setActive((byte) 1);
            Teacher updatedTeacher = teacherRepository.saveAndFlush(teacher);
            entityManager.refresh(updatedTeacher);
            return getByIdCustom(updatedTeacher.getId());
        } else
            return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        Teacher teacher = teacherRepository.getById(id);
        if (teacher != null) {
            teacher.setActive((byte) 0);
            teacherRepository.saveAndFlush(teacher);
            return "Success";
        } else {
            return "Fail";
        }
    }

    @GetMapping(value = "/values")
    public List<Value> getAllValues() {
        List<Teacher> teacherList = teacherRepository.findAll();
        List<Value> result = new ArrayList<>();
        for (Teacher teacher : teacherList) {
            result.add(new Value(teacher.getId(), teacher.getFirstName() + " " + teacher.getLastName()));
        }

        return result;
    }
}