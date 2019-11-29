package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.College;
import ba.telegroup.university_system.model.modelCustom.CollegeUniversity;
import ba.telegroup.university_system.repository.CollegeRepository;
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
@RequestMapping("hub/college")
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

    @GetMapping(value = "/custom/")
    public List<CollegeUniversity> getAllCustom() {
        return collegeRepository.getAllCustom();
    }

    @GetMapping(value = "/custom/{id}")
    public CollegeUniversity getByIdCustom(@PathVariable Integer id) {
        return collegeRepository.getByIdCustom(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public CollegeUniversity insert(@RequestBody College college) {
        College insertedCollege = collegeRepository.saveAndFlush(college);
        entityManager.refresh(insertedCollege);
        System.out.println(insertedCollege.getId());
        return getByIdCustom(insertedCollege.getId());
    }

    @Transactional
    @PutMapping(value = "/")
    public CollegeUniversity update(@RequestBody College college) {
        if (collegeRepository.getById(college.getId()) != null) {
            college.setActive((byte) 1);
            College updatedCollege = collegeRepository.saveAndFlush(college);
            entityManager.refresh(updatedCollege);
            return getByIdCustom(updatedCollege.getId());
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

    @GetMapping(value = "/values")
    public List<Value> getAllValues() {
        List<College> collegeList = collegeRepository.findAll();
        List<Value> result = new ArrayList<>();
        for (College college : collegeList) {
            result.add(new Value(college.getId(), college.getName()));
        }

        return result;
    }
}
