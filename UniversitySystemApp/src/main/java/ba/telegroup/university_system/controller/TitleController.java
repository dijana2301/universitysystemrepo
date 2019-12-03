package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.Title;
import ba.telegroup.university_system.repository.TitleRepository;
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
@RequestMapping("hub/title")
@Scope("request")
public class TitleController {

    private final TitleRepository titleRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public TitleController(TitleRepository titleRepository) {
        this.titleRepository = titleRepository;
    }

    @GetMapping(value = "/")
    public List<Title> getAll() {
        return titleRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Title getById(@PathVariable Integer id) {
        return titleRepository.getById(id);
    }

    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public Title insert(@RequestBody Title title) {
        Title insertedTitle = titleRepository.saveAndFlush(title);
        entityManager.refresh(insertedTitle);
        System.out.println(insertedTitle.getId());
        return insertedTitle;
    }

    @Transactional
    @PutMapping(value = "/")
    public Title update(@RequestBody Title title) {
        if (titleRepository.getById(title.getId()) != null) {
            Title updatedTitle = titleRepository.saveAndFlush(title);
            entityManager.refresh(updatedTitle);
            return updatedTitle;
        }
        return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        try {
            titleRepository.deleteById(id);
            return "Success";
        } catch (Exception ex) {
            return "Fail";
        }
    }

    @GetMapping(value = "/values")
    public List<Value> getAllValues() {
        List<Title> titleList = titleRepository.findAll();
        List<Value> result = new ArrayList<>();
        for (Title title : titleList) {
            result.add(new Value(title.getId(), title.getName()));
        }

        return result;
    }
}