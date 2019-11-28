package ba.telegroup.university_system.controller;


import ba.telegroup.university_system.model.Mark;
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
@RequestMapping("mark")
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


    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public Mark insert(@RequestBody Mark mark) {
        Mark insertedMark = markRepository.saveAndFlush(mark);
        entityManager.refresh(insertedMark);
        System.out.println(insertedMark.getId());
        return insertedMark;
    }

}