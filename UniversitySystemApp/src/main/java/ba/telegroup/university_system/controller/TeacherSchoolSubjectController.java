package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.TeacherSchoolSubject;
import ba.telegroup.university_system.repository.TeacherSchoolSubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("/teacherSchoolSubject")
@Scope("request")
public class TeacherSchoolSubjectController {

    private final TeacherSchoolSubjectRepository teacherSchoolSubjectRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public TeacherSchoolSubjectController(TeacherSchoolSubjectRepository teacherSchoolSubjectRepository) {
        this.teacherSchoolSubjectRepository = teacherSchoolSubjectRepository;
    }

    @GetMapping(value = "/")
    public List<TeacherSchoolSubject> getAll() {
        return teacherSchoolSubjectRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public TeacherSchoolSubject getById(@PathVariable Integer id) {
        return teacherSchoolSubjectRepository.getById(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherSchoolSubject insert(@RequestBody TeacherSchoolSubject teacherSchoolSubject) {
        TeacherSchoolSubject insertedTeacherSchoolSubject = teacherSchoolSubjectRepository.saveAndFlush(teacherSchoolSubject);
        entityManager.refresh(insertedTeacherSchoolSubject);
        System.out.println(insertedTeacherSchoolSubject.getId());
        return insertedTeacherSchoolSubject;
    }

    @Transactional
    @PutMapping(value = "/")
    public TeacherSchoolSubject update(@RequestBody TeacherSchoolSubject teacherSchoolSubject) {
        if (teacherSchoolSubjectRepository.getById(teacherSchoolSubject.getId()) != null) {
            TeacherSchoolSubject updatedTeacherSchoolSubject = teacherSchoolSubjectRepository.saveAndFlush(teacherSchoolSubject);
            entityManager.refresh(updatedTeacherSchoolSubject);
            return updatedTeacherSchoolSubject;
        }
        return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        try {
            teacherSchoolSubjectRepository.deleteById(id);
            return "Success";
        } catch (Exception ex) {
            return "Fail";
        }
    }
}