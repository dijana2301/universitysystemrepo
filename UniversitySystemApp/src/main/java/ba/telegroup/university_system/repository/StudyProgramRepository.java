package ba.telegroup.university_system.repository;

import ba.telegroup.university_system.model.StudyProgram;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyProgramRepository extends JpaRepository<StudyProgram, Integer> {

    List<StudyProgram> findAll();

    List<StudyProgram> getAllByActive(Byte active);

    StudyProgram getById(Integer id);
}
