package ba.telegroup.university_system.repository.repositoryCustom;


import ba.telegroup.university_system.model.modelCustom.StudentStudyProgram;

import java.util.List;

public interface StudentRepositoryCustom {

    List<StudentStudyProgram> getAllCustom();

    StudentStudyProgram getByIdCustom(Integer id);
}
