package ba.telegroup.university_system.controller;


import ba.telegroup.university_system.model.Mark;
import ba.telegroup.university_system.model.modelCustom.MarkStudentSchoolSubjectTeacher;
import ba.telegroup.university_system.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("/hub/mark")
@Scope("request")
public class MarkController {

    private final MarkRepository markRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public MarkController(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    @GetMapping(value = "/")
    public List<Mark> getAll() {
        return markRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Mark getById(@PathVariable Integer id) {
        return markRepository.getById(id);
    }

    @GetMapping(value = "/custom/")
    public List<MarkStudentSchoolSubjectTeacher> getAllCustom() {
        return markRepository.getAllCustom();
    }

    @GetMapping(value = "/custom/{id}")
    public MarkStudentSchoolSubjectTeacher getByIdCustom(@PathVariable Integer id) {
        return markRepository.getByIdCustom(id);
    }

    @GetMapping(value = "/custom/byStudentId/{studentId}")
    public List<MarkStudentSchoolSubjectTeacher> getByStudentIdCustom(@PathVariable Integer studentId) {
        return markRepository.getByStudentIdCustom(studentId);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public MarkStudentSchoolSubjectTeacher insert(@RequestBody Mark mark) {
        Mark insertedMark = markRepository.saveAndFlush(mark);
        entityManager.refresh(insertedMark);
        System.out.println(insertedMark.getId());
        return getByIdCustom(insertedMark.getId());
    }

    @Transactional
    @PutMapping(value = "/")
    public MarkStudentSchoolSubjectTeacher update(@RequestBody Mark mark) {
        if (markRepository.getById(mark.getId()) != null) {
            Mark updatedMark = markRepository.saveAndFlush(mark);
            entityManager.refresh(updatedMark);
            System.out.println(updatedMark.getId());
            return getByIdCustom(updatedMark.getId());
        }
        return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        try {
            markRepository.deleteById(id);
            return "Success";
        } catch (Exception ex) {
            return "Fail";
        }

    }


}