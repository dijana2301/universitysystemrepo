package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.College;
import ba.telegroup.university_system.repository.CollegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("/college")
@Scope("request")
public class CollegeController {

    private final CollegeRepository collegeRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public CollegeController(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @GetMapping(value = "/")
    public List<College> getAll() {
        return collegeRepository.getAllByActive((byte) 1);
    }

    @GetMapping(value = "/{id}")
    public College getById(@PathVariable Integer id) {
        return collegeRepository.getById(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public College insert(@RequestBody College college) {
        College insertedCollege = collegeRepository.saveAndFlush(college);
        entityManager.refresh(insertedCollege);
        System.out.println(insertedCollege.getId());
        return insertedCollege;
    }

    @Transactional
    @PutMapping(value = "/")
    public College update(@RequestBody College college) {
        if (collegeRepository.getById(college.getId()) != null) {
            college.setActive((byte) 1);
            College updatedCollege = collegeRepository.saveAndFlush(college);
            entityManager.refresh(updatedCollege);
            return updatedCollege;
        }
        return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        College college = collegeRepository.getById(id);
        if (college != null) {
            college.setActive((byte) 0);
            collegeRepository.saveAndFlush(college);
            return "Success";
        } else
            return "Fail";

    }
}
