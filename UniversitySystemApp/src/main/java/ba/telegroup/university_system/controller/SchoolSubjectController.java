package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.SchoolSubject;
import ba.telegroup.university_system.repository.SchoolSubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("/schoolSubject")
@Scope("request")
public class SchoolSubjectController {
    private final SchoolSubjectRepository schoolSubjectRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public SchoolSubjectController(SchoolSubjectRepository schoolSubjectRepository) {
        this.schoolSubjectRepository = schoolSubjectRepository;
    }

    @GetMapping(value = "/")
    public List<SchoolSubject> getAll() {
        return schoolSubjectRepository.getAllByActive((byte) 1);
    }

    @GetMapping(value = "/{id}")
    public SchoolSubject getById(@PathVariable Integer id) {
        return schoolSubjectRepository.getById(id);
    }


    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public SchoolSubject insert(@RequestBody SchoolSubject schoolSubject) {
        SchoolSubject insertedSchoolSubject = schoolSubjectRepository.saveAndFlush(schoolSubject);
        entityManager.refresh(insertedSchoolSubject);
        System.out.println(insertedSchoolSubject.getId());
        return insertedSchoolSubject;
    }

    @Transactional
    @PutMapping(value = "/")
    public SchoolSubject update(@RequestBody SchoolSubject schoolSubject) {
        if (schoolSubjectRepository.getById(schoolSubject.getId()) != null) {
            schoolSubject.setActive((byte) 1);
            SchoolSubject updatedSchoolSubject = schoolSubjectRepository.saveAndFlush(schoolSubject);
            entityManager.refresh(updatedSchoolSubject);
            return updatedSchoolSubject;
        }
        return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        SchoolSubject schoolSubject = schoolSubjectRepository.getById(id);
        if (schoolSubject != null) {
            schoolSubject.setActive((byte) 0);
            schoolSubjectRepository.saveAndFlush(schoolSubject);
            return "Success";
        } else
            return "Fail";

    }

}