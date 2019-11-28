package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.University;
import ba.telegroup.university_system.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("/university")
@Scope("request")
public class UniversityController {
    private final UniversityRepository universityRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UniversityController(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    @GetMapping(value = "/")
    public List<University> getAll() {
        return universityRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public University getById(@PathVariable Integer id) {
        return universityRepository.getById(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public University insert(@RequestBody University university) {
        University insertedUniversity = universityRepository.saveAndFlush(university);
        entityManager.refresh(insertedUniversity);
        System.out.println(insertedUniversity.getId());
        return insertedUniversity;
    }

    @Transactional
    @PutMapping(value = "/")
    public University update(@RequestBody University university) {
        if (universityRepository.getById(university.getId()) != null) {
            University updatedUniversity = universityRepository.saveAndFlush(university);
            entityManager.refresh(updatedUniversity);
            return updatedUniversity;
        }
        return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        try {
            universityRepository.deleteById(id);
            return "Success";
        } catch (Exception ex) {
            return "Fail";
        }
    }

}
