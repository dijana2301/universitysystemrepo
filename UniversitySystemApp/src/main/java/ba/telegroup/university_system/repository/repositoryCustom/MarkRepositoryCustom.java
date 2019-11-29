package ba.telegroup.university_system.repository.repositoryCustom;

import ba.telegroup.university_system.model.modelCustom.MarkStudentSchoolSubjectTeacher;

import java.util.List;

public interface MarkRepositoryCustom {
    List<MarkStudentSchoolSubjectTeacher> getAllCustom();

    MarkStudentSchoolSubjectTeacher getByIdCustom(Integer id);
}
