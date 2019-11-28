package ba.telegroup.university_system.controller;

import ba.telegroup.university_system.model.StudyProgram;
import ba.telegroup.university_system.repository.StudyProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("/studyProgram")
@Scope("request")
public class StudyProgramController {

    private final StudyProgramRepository studyProgramRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public StudyProgramController(StudyProgramRepository studyProgramRepository) {
        this.studyProgramRepository = studyProgramRepository;
    }

    @GetMapping(value = "/")
    public List<StudyProgram> getAll() {
        return studyProgramRepository.getAllByActive((byte) 1);
    }

    @GetMapping(value = "/{id}")
    public StudyProgram getById(@PathVariable Integer id) {
        return studyProgramRepository.getById(id);
    }


    @Transactional
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public StudyProgram insert(@RequestBody StudyProgram studyProgram) {
        StudyProgram insertedStudyProgram = studyProgramRepository.saveAndFlush(studyProgram);
        entityManager.refresh(insertedStudyProgram);
        System.out.println(insertedStudyProgram.getId());
        return insertedStudyProgram;
    }

    @Transactional
    @PutMapping(value = "/")
    public StudyProgram update(@RequestBody StudyProgram studyProgram) {
        if (studyProgramRepository.getById(studyProgram.getId()) != null) {
            studyProgram.setActive((byte) 1);
            StudyProgram updatedStudyProgram = studyProgramRepository.saveAndFlush(studyProgram);
            entityManager.refresh(updatedStudyProgram);
            return updatedStudyProgram;
        } else
            return null;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id) {
        StudyProgram studyProgram = studyProgramRepository.getById(id);
        if (studyProgram != null) {
            studyProgram.setActive((byte) 0);
            studyProgramRepository.saveAndFlush(studyProgram);
            return "Success";
        } else
            return "Fail";

    }

}
