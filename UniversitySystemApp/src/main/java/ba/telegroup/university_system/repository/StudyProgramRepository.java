package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.StudyProgram;
import ba.telegroup.university_system.repository.repositoryCustom.StudyProgramRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyProgramRepository extends JpaRepository<StudyProgram, Integer>, StudyProgramRepositoryCustom {

    List<StudyProgram> findAll();
    List<StudyProgram> getAllByActive(Byte active);
    StudyProgram getById(Integer id);
}
