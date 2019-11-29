package ba.telegroup.university_system.repository.repositoryCustom;

import ba.telegroup.university_system.model.modelCustom.StudyProgramCollege;

import java.util.List;

public interface StudyProgramRepositoryCustom {

    List<StudyProgramCollege> getAllCustom();

    StudyProgramCollege getByIdCustom(Integer id);
}
