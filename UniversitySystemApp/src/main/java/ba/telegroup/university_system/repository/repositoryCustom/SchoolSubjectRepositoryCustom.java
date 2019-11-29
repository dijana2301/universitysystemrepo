package ba.telegroup.university_system.repository.repositoryCustom;


import ba.telegroup.university_system.model.modelCustom.SchoolSubjectStudyProgram;

import java.util.List;

public interface SchoolSubjectRepositoryCustom {

    List<SchoolSubjectStudyProgram> getAllCustom();

    SchoolSubjectStudyProgram getByIdCustom(Integer id);
}
